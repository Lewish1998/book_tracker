from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:admin@localhost:5432/books'
app.config['JWT_SECRET_KEY'] = 'dev'  # Replace with your secret key
db = SQLAlchemy(app)
ma = Marshmallow(app)
jwt = JWTManager(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), unique=True, nullable=False)
    password = db.Column(db.String(40), nullable=False)

    def __init__(self, username, password):
        self.username = username
        # self.password = generate_password_hash(password)#.decode('utf8')[:25] # Hash the password for security. Restricted to 25 characters for the testing
        self.password = password # MAKE SURE TO HASH THE PASSWORD BEFORE DEPLOYMENT

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()
    if user and password:
        token = create_access_token(identity=username)
        return jsonify(token=token), 200

    # if user and check_password_hash(user.password, password):
    #     token = create_access_token(identity=username)
    #     return jsonify(token=token), 200
    # MAKE SURE TO ADD BACK BEFORE DEPLOYMENT

    return jsonify(message='Invalid username or password'), 401

# Protect a route with jwt_required, which requires a valid token in the request to access
@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    username = data.get('username')
    password = data.get('password')

    # Check if the username already exists
    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify(message='Username already exists'), 400

    new_user = User(username, password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify(message='User created'), 201


class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), unique=True, nullable=False)
    description = db.Column(db.String(120), nullable=True)
    author = db.Column(db.String(120), nullable=True)
    genre = db.Column(db.String(120), nullable=True)
    read = db.Column(db.Boolean, default=False)
    # page_number = db.Column(db.Integer, nullable=True)
    # minutes_read = db.Column(db.Integer, nullable=True)

    def __init__(self, title, description, author, genre, read, ): # page_number, minutes_read):
        self.title = title
        self.description = description
        self.author = author
        self.genre = genre
        self.read = read
        # self.page_number = page_number
        # self.minutes_read = minutes_read

class BookSchema(ma.Schema):
    class Meta:
        fields = ('id', 'title', 'description', 'author', 'genre', 'read',) #'page_number', 'minutes_read')

book_schema = BookSchema()
books_schema = BookSchema(many=True)

@app.route('/book', methods=['POST'])
def add_book():
    title = request.json['title']
    description = request.json['description']
    author = request.json['author']
    genre = request.json['genre']
    read = request.json['read']
    # page_number = request.json['page_number']
    # minutes_read = request.json['minutes_read']
    new_book = Book(title, description, author, genre, read, )#page_number, minutes_read)
    db.session.add(new_book)
    db.session.commit()
    return book_schema.jsonify(new_book)

@app.route('/book', methods=['GET'])
def get_books():
    all_books = Book.query.all()
    result = books_schema.dump(all_books)
    return jsonify(result)

@app.route('/book/<id>', methods=['GET'])
def get_book(id):
    book = Book.query.get(id)
    return book_schema.jsonify(book)

@app.route('/book/<id>', methods=['PUT'])
def update_book(id):
    book = Book.query.get(id)
    title = request.json['title']
    description = request.json['description']
    author = request.json['author']
    genre = request.json['genre']
    read = request.json['read']
    # page_number = request.json['page_number']
    # minutes_read = request.json['minutes_read']
    book.title = title
    book.description = description
    book.author = author
    book.genre = genre
    book.read = read
    # book.page_number = page_number
    # book.minutes_read = minutes_read
    db.session.commit()
    return book_schema.jsonify(book)

@app.route('/book/<id>', methods=['DELETE'])
def delete_book(id):
    book = Book.query.get(id)
    db.session.delete(book)
    db.session.commit()
    return book_schema.jsonify(book)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
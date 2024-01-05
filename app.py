from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:admin@localhost:5432/books'
db = SQLAlchemy(app)
ma = Marshmallow(app)

class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), unique=True, nullable=False)
    description = db.Column(db.String(120), nullable=True)
    author = db.Column(db.String(120), nullable=True)
    genre = db.Column(db.String(120), nullable=True)
    read = db.Column(db.Boolean, default=False)
    page_number = db.Column(db.Integer, nullable=True)
    minutes_read = db.Column(db.Integer, nullable=True)

    def __init__(self, title, description, author, genre, read, page_number, minutes_read):
        self.title = title
        self.description = description
        self.author = author
        self.genre = genre
        self.read = read
        self.page_number = page_number
        self.minutes_read = minutes_read

class BookSchema(ma.Schema):
    class Meta:
        fields = ('id', 'title', 'description', 'author', 'genre', 'read', 'page_number', 'minutes_read')

book_schema = BookSchema()
books_schema = BookSchema(many=True)

@app.route('/book', methods=['POST'])
def add_book():
    title = request.json['title']
    description = request.json['description']
    author = request.json['author']
    genre = request.json['genre']
    read = request.json['read']
    page_number = request.json['page_number']
    minutes_read = request.json['minutes_read']
    new_book = Book(title, description, author, genre, read, page_number, minutes_read)
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
    page_number = request.json['page_number']
    minutes_read = request.json['minutes_read']
    book.title = title
    book.description = description
    book.author = author
    book.genre = genre
    book.read = read
    book.page_number = page_number
    book.minutes_read = minutes_read
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
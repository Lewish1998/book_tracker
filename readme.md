clone repo

mac: python3 -m venv venv && source venv/bin/activate
windows: python -m venv venv
         ./venv/Scripts/activate

cd into frontend
npm install

create postgres db "books"

run backend: python app.py
run frontend: npm run dev
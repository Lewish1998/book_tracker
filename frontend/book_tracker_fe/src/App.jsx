import './App.css'
import { useEffect, useState } from 'react'
import BookDetail from './BookDetail/BookDetail'
import AddBookForm from './AddBookForm'

export default function App() {

  const [books, setBooks] = useState([])
  const [form, setForm] = useState(false)

  useEffect(() => {
    fetch('http://127.0.0.1:5000/book')
    .then(res=>res.json())
    .then(data=>setBooks(data))
    .catch((err) => {
      console.error(err)
    })
  }, [])

  const deleteBook = (id) => {
    fetch(`http://localhost:5000/book/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const updateBook = (id) => {
    fetch(`http://localhost:5000/book/${id}`, {
      method: 'PUT',
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const book = books.map((book) => {
    return (
      <BookDetail key={book.id} book={book} deleteBook={deleteBook} updateBook={updateBook}/>
    )
  })

  return (
    <>
      <div className='add-book'>
        <button onClick={() => {
          form ? setForm(false) : setForm(true)
        }}>Add Book</button>
        {form ? <AddBookForm /> : null}
      </div>
      <div className='books-container'>
        <h4>Books:</h4>
        {book}
      </div>

    </>
  )
}
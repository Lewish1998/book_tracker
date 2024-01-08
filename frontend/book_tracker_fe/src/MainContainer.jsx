import './App.css'
import { useEffect, useState } from 'react'
import BookDetail from './BookDetail/BookDetail'
import AddBookForm from './AddBookForm'
import { FaCog } from 'react-icons/fa';
import BookCount from './BookCount';
import Settings from './Settings';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LoginPage from './LoginPage';

export default function MainContainer() {

  const [books, setBooks] = useState([])
  const [form, setForm] = useState(false)
  const [sort, setSort] = useState('asc')
  const [settings, setSettings] = useState(false)

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
        setBooks(books.filter((book) => book.id !== id))
        // window.location.reload();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const updateBook = (bookId, title, description, author, genre, read) => {
    fetch(`http://localhost:5000/book/${bookId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        description: description,
        author: author,
        genre: genre,
        read: read
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        console.log(read)
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    console.log(bookId)
  }

  const markAsRead = (bookId, title, description, author, genre, read) => {
    fetch(`http://localhost:5000/book/${bookId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        description: description,
        author: author,
        genre: genre,
        read: !read
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        console.log(read)
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    console.log(bookId)
  }

  const handleSortChange = (e) => {
    setSort(e.target.value)
  }

  const toggleDetail = () => {
    setSettings(!settings)
    console.log('settings')
  }

  const sortedBooks = [...books].sort((a, b) => {
    if (sort === 'asc') {
      return a.title.localeCompare(b.title);
    } else if (sort === 'desc') {
      return b.title.localeCompare(a.title);
    } else {
      return 0
    }
  });
  

  return (
    <>
    <div className='title'>
      <h1>Book Tracker</h1>
    </div>
    <div>
      <button onClick={toggleDetail}><FaCog /></button>
      {settings ? <Settings /> : null}
    </div>
    <div>
      <BookCount books={books}/>
    </div>    
    <div className='sort'>
      <select value={sort} onChange={handleSortChange}>
        <option value="asc">Title (A-Z)</option>
        <option value="desc">Title (Z-A)</option>
      </select>
    </div>
    <div className='add-book'>
      <button onClick={() => {
        form ? setForm(false) : setForm(true)
      }}>{!form ? "Add Book" : "Close"}</button>
      {form ? <AddBookForm /> : null}
    </div>
    <div className='book-container'>
      {sortedBooks.map((book) => {
        return (
          <BookDetail key={book.id} book={book} deleteBook={deleteBook} updateBook={updateBook} markAsRead={markAsRead}/>
        )})
      }
    </div>
    </>
  )
}
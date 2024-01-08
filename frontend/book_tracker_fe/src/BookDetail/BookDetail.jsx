/* eslint-disable react/prop-types */
// ✅

import { useState } from 'react';
import './BookDetail.css'
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';

const BookDetail = ({ book, deleteBook, markAsRead, updateBook }) => {

    const [isEditing, setIsEditing] = useState(false)
    const [updatedBook, setUpdatedBook] = useState(book)

    const handleDelete = () => {
        deleteBook(book.id)
        console.log(book.id)
    }

    const handleUpdate = () => {
        setIsEditing(!isEditing)
    }

    const handleChange = (e) => {
        setUpdatedBook({ ...updatedBook, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        setIsEditing(!isEditing)
        updateBook(book.id, updatedBook.title, updatedBook.description, updatedBook.author, updatedBook.genre, updatedBook.read)
    }

    return (
        <div className='books-container'>
          <ul>
            {isEditing ? (
              <>
                <li><input name="title" value={updatedBook.title} onChange={handleChange} /></li>
                <li><input name="author" value={updatedBook.author} onChange={handleChange} /></li>
                <li><input name="genre" value={updatedBook.genre} onChange={handleChange} /></li>
                <li><input name="description" value={updatedBook.description} onChange={handleChange} /></li>
              </>
            ) : (
              <>
                <li><h3>{book.title}</h3></li>
                <li><p>Author: {book.author}</p></li>
                <li><p>Genre: {book.genre}</p></li>
                <li><p>Description: {book.description}</p></li>
                <li>Read: <button onClick={() => {
                    markAsRead(book.id, book.title, book.description, book.author, book.genre, book.read)
                }}>{book.read ? <FaCheck color='green' /> : <FaTimes color='red' />}</button></li>
              </>
            )}
            <div className='buttons-container'>
              {/* <li><button onClick={handleUpdate}><FaEdit /></button></li> */}
              <li>
                {!isEditing ? <button onClick={handleUpdate}><FaEdit /></button> 
                : <button onClick={handleSubmit}><FaCheck color='green'/></button>}
              </li>
              <li><button onClick={handleDelete}><FaTrash color='red' /></button></li>
            </div>
          </ul>
        </div>
      );
    };
export default BookDetail
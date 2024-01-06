/* eslint-disable react/prop-types */
import './BookDetail.css'
import { FaTrash, FaEdit } from 'react-icons/fa';

const BookDetail = ({ book, deleteBook }) => {

    const handleDelete = () => {
        deleteBook(book.id)
        console.log(book.id)
    }

    const handleUpdate = () => {
        // Add your logic for handling the update here
    }

    return (
        <div className='books-container'>
            <p>Title: {book.title}</p>
            <p>Author: {book.author}</p>
            <p>Genre: {book.genre}</p>
            <p>Read: {book.read}</p>
            <p>Rating: {book.rating}</p>
            <button onClick={handleDelete}><FaTrash /></button>
            <button onClick={handleUpdate}><FaEdit />n/a</button>
        </div>
    )
}
export default BookDetail
/* eslint-disable react/prop-types */
import { FaTrash } from 'react-icons/fa';
import './BookDetail.css'

const BookDetail = ({ book, deleteBook }) => {

    const handleClick = () => {
        deleteBook(book.id)
        console.log(book.id)
    }

    return (
        <div className='books-container'>
            <p>Title: {book.title}</p>
            <p>Author: {book.author}</p>
            <p>Genre: {book.genre}</p>
            <p>Year: {book.year}</p>
            <p>Read: {book.read}</p>
            <p>Rating: {book.rating}</p>
            <button onClick={handleClick}><FaTrash /></button>
        </div>
    )
}
export default BookDetail
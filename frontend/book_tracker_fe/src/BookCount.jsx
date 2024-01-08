import React from 'react'

const BookCount = ({ books }) => {
    const readBooks = books.filter(book => book.read).length;

    return (
        <div>
                <h4>Books: {books.length}</h4>
                <h4>Read: {readBooks}</h4>
                <h4>Unread: {books.length - readBooks}</h4>
        </div>
    )
}

export default BookCount
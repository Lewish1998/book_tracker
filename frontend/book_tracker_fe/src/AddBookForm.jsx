import { useState } from 'react'
import './AddBookForm.css'

const AddBookForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [read, setRead] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        description: description || '',
        author: author || '',
        genre: genre || '',
        read: read,
      }),
    })
    .then(response => response.json())
    .then(data => {
      window.location.reload();
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

    setTitle("");
    setDescription("");
    setAuthor("");
    setGenre("");
    setRead(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label id='title'>
        Title:
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} required/>
      </label>
      <label id='description'>
        Description:
        <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
      </label>
      <label id='author'>
        Author:
        <input type="text" value={author} onChange={e => setAuthor(e.target.value)} />
      </label>
      <label id='genre'>
        Genre:
        <input type="text" value={genre} onChange={e => setGenre(e.target.value)} />
      </label>
      <label id='read'>
        Read:
        <input type="checkbox" checked={read} onChange={e => setRead(e.target.checked)} />
      </label>
      <input id='submit' type="submit" value="Submit" />
    </form>
  )
}

export default AddBookForm
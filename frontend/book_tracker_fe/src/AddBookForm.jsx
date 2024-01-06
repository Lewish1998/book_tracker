import { useState } from 'react'

const AddBookForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [read, setRead] = useState(false);
  const [pageNumber, setPageNumber] = useState("");
  const [minutesRead, setMinutesRead] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        description: description || 'null',
        author: author || 'null',
        genre: genre || 'null',
        read: read,
        page_number: pageNumber || 'null',
        minutes_read: minutesRead || 'null',
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
    setPageNumber("");
    setMinutesRead("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} required/>
      </label>
      <label>
        Description:
        <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
      </label>
      <label>
        Author:
        <input type="text" value={author} onChange={e => setAuthor(e.target.value)} />
      </label>
      <label>
        Genre:
        <input type="text" value={genre} onChange={e => setGenre(e.target.value)} />
      </label>
      <label>
        Read:
        <input type="checkbox" checked={read} onChange={e => setRead(e.target.checked)} />
      </label>
      <label>
        Page Number:
        <input type="number" value={pageNumber} onChange={e => setPageNumber(e.target.value)} />
      </label>
      <label>
        Minutes Read:
        <input type="number" value={minutesRead} onChange={e => setMinutesRead(e.target.value)} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  )
}

export default AddBookForm
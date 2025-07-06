import React, { useState } from 'react';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    year: '',
    price: '',
    isbn: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const addBook = () => {
    const { title, author, year, price, isbn } = formData;

    if (!title || !author || !year || !price || !isbn) {
      alert("Please fill in all fields.");
      return;
    }

    const newBook = { ...formData, id: Date.now().toString() };
    setBooks(prev => [...prev, newBook]);

    setFormData({ title: '', author: '', year: '', price: '', isbn: '' });
  };

  const removeBook = (id) => {
    setBooks(prev => prev.filter(book => book.id !== id));
  };

  return (
    <div className="app">
      <h1>📚 My Bookshelf</h1>

      <div className="form">
        <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} />
        <input name="author" placeholder="Author" value={formData.author} onChange={handleChange} />
        <input name="year" placeholder="Year" value={formData.year} onChange={handleChange} />
        <input name="price" placeholder="Price" value={formData.price} onChange={handleChange} />
        <input name="isbn" placeholder="ISBN" value={formData.isbn} onChange={handleChange} />
        <button onClick={addBook}>Add Book</button>
      </div>

      <ul className="book-list">
        {books.map(book => (
          <li key={book.id} className="book-item">
            <span><strong>Title:</strong> {book.title}</span>
            <span><strong>Author:</strong> {book.author}</span>
            <span><strong>Year:</strong> {book.year}</span>
            <span><strong>Price:</strong> ${book.price}</span>
            <span><strong>ISBN:</strong> {book.isbn}</span>
            <button onClick={() => removeBook(book.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import { db } from "./firebase"; // adjust the path if needed
import { ref, onValue, set, remove } from "firebase/database";

const App = () => {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    year: "",
    price: "",
    isbn: "",
  });

  // Load books from Firebase when component mounts
  useEffect(() => {
    const booksRef = ref(db, "books/");
    onValue(booksRef, (snapshot) => {
      const data = snapshot.val() || {};
      // Convert Firebase object to array of books with IDs
      const booksArray = Object.entries(data).map(([id, book]) => ({
        id,
        ...book,
      }));
      setBooks(booksArray);
    });
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const addBook = (e) => {
    e.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.author.trim() ||
      !formData.year.trim() ||
      !formData.price.trim() ||
      !formData.isbn.trim()
    ) {
      alert("Please fill all fields");
      return;
    }

    const id = Date.now().toString();

    set(ref(db, "books/" + id), {
      title: formData.title,
      author: formData.author,
      year: formData.year,
      price: formData.price,
      isbn: formData.isbn,
    });

    setFormData({
      title: "",
      author: "",
      year: "",
      price: "",
      isbn: "",
    });
  };

  const removeBook = (id) => {
    remove(ref(db, "books/" + id));
  };

  return (
    <div style={{ maxWidth: 700, margin: "2rem auto", fontFamily: "Arial, sans-serif" }}>
      <h1>Bookshelf</h1>
      <form
        onSubmit={addBook}
        style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}
      >
        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={formData.title}
          onChange={handleChange}
          style={{ flex: "1 1 30%" }}
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          style={{ flex: "1 1 30%" }}
        />
        <input
          type="number"
          name="year"
          placeholder="Year"
          value={formData.year}
          onChange={handleChange}
          style={{ flex: "1 1 10%" }}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          style={{ flex: "1 1 10%" }}
          step="0.01"
        />
        <input
          type="text"
          name="isbn"
          placeholder="ISBN"
          value={formData.isbn}
          onChange={handleChange}
          style={{ flex: "1 1 30%" }}
        />
        <button type="submit" style={{ flex: "1 1 100%", padding: "0.5rem" }}>
          Add Book
        </button>
      </form>

      <hr style={{ margin: "1rem 0" }} />

      {books.length === 0 ? (
        <p>No books added yet.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ borderBottom: "1px solid #ccc", padding: "0.5rem" }}>
                Title
              </th>
              <th style={{ borderBottom: "1px solid #ccc", padding: "0.5rem" }}>
                Author
              </th>
              <th style={{ borderBottom: "1px solid #ccc", padding: "0.5rem" }}>
                Year
              </th>
              <th style={{ borderBottom: "1px solid #ccc", padding: "0.5rem" }}>
                Price
              </th>
              <th style={{ borderBottom: "1px solid #ccc", padding: "0.5rem" }}>
                ISBN
              </th>
              <th style={{ borderBottom: "1px solid #ccc", padding: "0.5rem" }}>
                Remove
              </th>
            </tr>
          </thead>
          <tbody>
            {books.map(({ id, title, author, year, price, isbn }) => (
              <tr key={id}>
                <td style={{ borderBottom: "1px solid #eee", padding: "0.5rem" }}>
                  {title}
                </td>
                <td style={{ borderBottom: "1px solid #eee", padding: "0.5rem" }}>
                  {author}
                </td>
                <td style={{ borderBottom: "1px solid #eee", padding: "0.5rem" }}>
                  {year}
                </td>
                <td style={{ borderBottom: "1px solid #eee", padding: "0.5rem" }}>
                  ${price}
                </td>
                <td style={{ borderBottom: "1px solid #eee", padding: "0.5rem" }}>
                  {isbn}
                </td>
                <td style={{ borderBottom: "1px solid #eee", padding: "0.5rem" }}>
                  <button
                    onClick={() => removeBook(id)}
                    style={{ color: "red" }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default App;

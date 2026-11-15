// Exercise 4: Library Book Search with Query Parameters
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-memory data model
let libraryBooks = [
  { id: 1, title: "C Programming Modern Approach", category: "Programming", available: true },
  { id: 2, title: "Database Systems", category: "Database", available: false },
  { id: 3, title: "Web Application Architecture", category: "Programming", available: true }
];

// 1. GET /api/books — Supports optional query parameter: ?category=Programming
app.get('/api/books', (req, res) => {
  const { category } = req.query;

  if (category) {
    // Filter books matching the category (case-insensitive for convenience)
    const filtered = libraryBooks.filter(
      book => book.category.toLowerCase() === category.trim().toLowerCase()
    );
    return res.status(200).json(filtered);
  }

  // If no category query parameter is provided, return all books
  res.status(200).json(libraryBooks);
});

// 2. GET /api/books/:id — Return single book by ID or 404 Not Found
app.get('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = libraryBooks.find(b => b.id === bookId);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.status(200).json(book);
});

// 3. POST /api/books — Add a new book (validating title and category are not empty strings)
app.post('/api/books', (req, res) => {
  const { title, category, available } = req.body;

  // Validate that title and category are non-empty strings
  if (
    !title || typeof title !== 'string' || title.trim() === '' ||
    !category || typeof category !== 'string' || category.trim() === ''
  ) {
    return res.status(400).json({
      message: "Validation failed: 'title' and 'category' must be non-empty strings."
    });
  }

  const nextId = libraryBooks.length > 0 ? libraryBooks[libraryBooks.length - 1].id + 1 : 1;
  const newBook = {
    id: nextId,
    title: title.trim(),
    category: category.trim(),
    available: available !== undefined ? Boolean(available) : true
  };

  libraryBooks.push(newBook);
  res.status(201).json(newBook);
});

// Start the server if run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Exercise 4 - Library Book Search API running on http://localhost:${PORT}`);
  });
}

module.exports = app;

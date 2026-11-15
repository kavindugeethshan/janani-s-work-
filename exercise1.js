// Exercise 1: Book Store API
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log incoming requests in terminal
app.use((req, res, next) => {
  console.log(`📡 [${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// In-memory array of books
let books = [
  { id: 1, title: "HTML & CSS", price: 1500 }
];

// 1. GET /api/books -> Return all books
app.get('/api/books', (req, res) => {
  res.status(200).json(books);
});

// 2. GET /api/books/:id -> Return single book by ID
app.get('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find(b => b.id === bookId);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.status(200).json(book);
});

// 3. POST /api/books -> Add a new book to the array
app.post('/api/books', (req, res) => {
  // Validate that request body exists and was parsed by express.json()
  if (!req.body || typeof req.body !== 'object') {
    return res.status(400).json({
      message: "Request body is required. Ensure 'Content-Type: application/json' header is sent with a valid JSON body."
    });
  }

  const { title, price } = req.body;

  if (!title || price === undefined) {
    return res.status(400).json({ message: "Title and price are required" });
  }

  const nextId = books.length > 0 ? books[books.length - 1].id + 1 : 1;
  const newBook = {
    id: nextId,
    title,
    price: Number(price)
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

// Error-handling middleware for JSON syntax errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ message: "Malformed JSON in request body" });
  }
  next(err);
});

// Start the server if run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Exercise 1 - Book Store API running on http://localhost:${PORT}`);
  });
}

module.exports = app;

// server.js - Unified Server mounting all 6 exercises
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Log incoming requests to terminal in real-time
app.use((req, res, next) => {
  console.log(`📡 [${new Date().toLocaleTimeString()}] ${req.method} ${req.originalUrl || req.url}`);
  next();
});

// Helper function to mount an app on a prefix without double-prefixing issues
const ex1 = require('./exercise1');
const ex2 = require('./exercise2');
const ex3 = require('./exercise3');
const ex4 = require('./exercise4');
const ex5 = require('./exercise5');
const ex6 = require('./exercise6');

// Mount exercises with specific prefixes
app.use('/ex1', ex1);
app.use('/ex2', ex2);
app.use('/ex3', ex3);
app.use('/ex4', ex4);
app.use('/ex5', ex5);
app.use('/ex6', ex6);

// Also mount routes directly so requests to http://localhost:3000/api/... work immediately!
app.use(ex1); // /api/books
app.use(ex2); // /api/attendance
app.use(ex3); // /api/results
app.use(ex5); // /api/appointments
app.use(ex6); // /api/menu, /api/orders

// Interactive Landing Page
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Express API Exercises (1 to 6)</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; margin: 30px auto; max-width: 900px; line-height: 1.6; color: #333; background: #f8fafc; padding: 0 20px; }
    h1 { color: #1e293b; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; }
    .card { background: white; border-radius: 8px; padding: 20px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .method { display: inline-block; padding: 3px 8px; font-weight: bold; font-size: 12px; border-radius: 4px; color: white; margin-right: 8px; }
    .get { background-color: #0284c7; }
    .post { background-color: #16a34a; }
    code { background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-family: monospace; font-size: 14px; }
    ul { list-style: none; padding-left: 0; }
    li { margin: 10px 0; }
    .tip { background: #e0f2fe; border-left: 4px solid #0284c7; padding: 12px; margin-top: 20px; border-radius: 4px; }
  </style>
</head>
<body>
  <h1>Node.js & Express REST API Exercises</h1>
  <p>All 6 exercises are running! You can test them via Postman or using the links below:</p>

  <div class="card">
    <h3>Exercise 1: Book Store API</h3>
    <ul>
      <li><span class="method get">GET</span><a href="/ex1/api/books" target="_blank"><code>/ex1/api/books</code></a> - List all books</li>
      <li><span class="method get">GET</span><a href="/ex1/api/books/1" target="_blank"><code>/ex1/api/books/1</code></a> - Get book by ID</li>
      <li><span class="method post">POST</span><code>/ex1/api/books</code> - Add new book</li>
    </ul>
  </div>

  <div class="card">
    <h3>Exercise 2: Student Attendance Logger API</h3>
    <ul>
      <li><span class="method get">GET</span><a href="/ex2/api/attendance" target="_blank"><code>/ex2/api/attendance</code></a> - Full attendance list</li>
      <li><span class="method get">GET</span><a href="/ex2/api/attendance/1" target="_blank"><code>/ex2/api/attendance/1</code></a> - Attendance by ID</li>
      <li><span class="method post">POST</span><code>/ex2/api/attendance</code> - Record student attendance</li>
    </ul>
  </div>

  <div class="card">
    <h3>Exercise 3: Academic Course Grading API</h3>
    <ul>
      <li><span class="method get">GET</span><a href="/ex3/api/results" target="_blank"><code>/ex3/api/results</code></a> - View all graded results</li>
      <li><span class="method post">POST</span><code>/ex3/api/results</code> - Calculate letter grade from marks</li>
    </ul>
  </div>

  <div class="card">
    <h3>Exercise 4: Library Book Search with Query Parameters</h3>
    <ul>
      <li><span class="method get">GET</span><a href="/ex4/api/books" target="_blank"><code>/ex4/api/books</code></a> - All library books</li>
      <li><span class="method get">GET</span><a href="/ex4/api/books?category=Programming" target="_blank"><code>/ex4/api/books?category=Programming</code></a> - Filter by category</li>
      <li><span class="method get">GET</span><a href="/ex4/api/books/2" target="_blank"><code>/ex4/api/books/2</code></a> - Single book by ID</li>
      <li><span class="method post">POST</span><code>/ex4/api/books</code> - Add library book (with title/category validation)</li>
    </ul>
  </div>

  <div class="card">
    <h3>Exercise 5: Hospital Doctor Appointment Booking API</h3>
    <ul>
      <li><span class="method get">GET</span><a href="/ex5/api/appointments" target="_blank"><code>/ex5/api/appointments</code></a> - List scheduled appointments</li>
      <li><span class="method post">POST</span><code>/ex5/api/appointments</code> - Book appointment (strict input validation)</li>
    </ul>
  </div>

  <div class="card">
    <h3>Exercise 6: University Canteen Food Ordering System</h3>
    <ul>
      <li><span class="method get">GET</span><a href="/ex6/api/menu" target="_blank"><code>/ex6/api/menu</code></a> - View menu & available stock</li>
      <li><span class="method get">GET</span><a href="/ex6/api/orders" target="_blank"><code>/ex6/api/orders</code></a> - View placed orders</li>
      <li><span class="method post">POST</span><code>/ex6/api/orders</code> - Place order & auto-deduct stock</li>
    </ul>
  </div>

  <div class="tip">
    <strong>Individual Execution:</strong> You can also run any exercise standalone on <code>http://localhost:3000</code>:
    <br><code>npm run ex1</code> | <code>npm run ex2</code> | <code>npm run ex3</code> | <code>npm run ex4</code> | <code>npm run ex5</code> | <code>npm run ex6</code>
  </div>
</body>
</html>
  `);
});

// Start unified server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`\nUnified Server running at: http://localhost:${PORT}`);
    console.log(`Visit http://localhost:${PORT} in your browser for the full dashboard.\n`);
  });
}

module.exports = app;


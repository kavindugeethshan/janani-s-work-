// Exercise 3: Academic Course Grading API
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-memory data model
let studentResults = [
  { id: 1, name: "Saman", marks: 85, grade: "A" },
  { id: 2, name: "Kavindi", marks: 45, grade: "Fail" }
];

// Helper function to calculate letter grade based on marks
function calculateGrade(marks) {
  if (marks >= 75) return "A";
  if (marks >= 65) return "B";
  if (marks >= 50) return "C";
  return "Fail";
}

// 1. GET /api/results — Returns all student results
app.get('/api/results', (req, res) => {
  res.status(200).json(studentResults);
});

// Optional GET /api/results/:id for convenience
app.get('/api/results/:id', (req, res) => {
  const resultId = parseInt(req.params.id);
  const result = studentResults.find(r => r.id === resultId);

  if (!result) {
    return res.status(404).json({ message: "Student result not found" });
  }

  res.status(200).json(result);
});

// 2. POST /api/results — Client sends { "name": "...", "marks": 72 }
// Server calculates grade, pushes new object to array, and returns 201 Created
app.post('/api/results', (req, res) => {
  const { name, marks } = req.body;

  if (!name || marks === undefined || typeof marks !== 'number' || marks < 0 || marks > 100) {
    return res.status(400).json({ message: "Valid name and marks (0-100) are required" });
  }

  const grade = calculateGrade(marks);
  const nextId = studentResults.length > 0 ? studentResults[studentResults.length - 1].id + 1 : 1;

  const newResult = {
    id: nextId,
    name,
    marks,
    grade
  };

  studentResults.push(newResult);
  res.status(201).json(newResult);
});

// Start the server if run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Exercise 3 - Academic Course Grading API running on http://localhost:${PORT}`);
  });
}

module.exports = app;

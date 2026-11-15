// Exercise 2: Student Attendance Logger API
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-memory data model
let attendance = [
  { id: 1, regNo: "AS2023001", studentName: "Kasun", present: true },
  { id: 2, regNo: "AS2023002", studentName: "Nimasha", present: false }
];

// 1. GET /api/attendance — Returns the full attendance record
app.get('/api/attendance', (req, res) => {
  res.status(200).json(attendance);
});

// 2. GET /api/attendance/:id — Returns the attendance record for student by id (404 if missing)
app.get('/api/attendance/:id', (req, res) => {
  const recordId = parseInt(req.params.id);
  const record = attendance.find(item => item.id === recordId);

  if (!record) {
    return res.status(404).json({ message: "Attendance record not found" });
  }

  res.status(200).json(record);
});

// 3. POST /api/attendance — Receives regNo and studentName, auto-sets id and defaults present: true, returns 201 Created
app.post('/api/attendance', (req, res) => {
  const { regNo, studentName } = req.body;

  if (!regNo || !studentName) {
    return res.status(400).json({ message: "regNo and studentName are required" });
  }

  const nextId = attendance.length > 0 ? attendance[attendance.length - 1].id + 1 : 1;
  const newRecord = {
    id: nextId,
    regNo,
    studentName,
    present: req.body.present !== undefined ? Boolean(req.body.present) : true
  };

  attendance.push(newRecord);
  res.status(201).json(newRecord);
});

// Start the server if run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Exercise 2 - Attendance Logger API running on http://localhost:${PORT}`);
  });
}

module.exports = app;

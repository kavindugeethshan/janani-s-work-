// Exercise 5: Hospital Doctor Appointment Booking API
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Log incoming requests in terminal
app.use((req, res, next) => {
  console.log(`📡 [${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// In-memory data model
let appointments = [
  { id: 1, patientName: "Sunil Perera", doctorName: "Dr. Silva", date: "2026-11-15", timeSlot: "10:00 AM" }
];

// 1. GET /api/appointments — List all scheduled appointments
app.get('/api/appointments', (req, res) => {
  res.status(200).json(appointments);
});

// Optional GET /api/appointments/:id — Retrieve single appointment by ID
app.get('/api/appointments/:id', (req, res) => {
  const appointmentId = parseInt(req.params.id);
  const appointment = appointments.find(a => a.id === appointmentId);

  if (!appointment) {
    return res.status(404).json({ message: "Appointment not found" });
  }

  res.status(200).json(appointment);
});

// 2. POST /api/appointments — Add a new appointment with strict input validation
app.post('/api/appointments', (req, res) => {
  if (!req.body || typeof req.body !== 'object') {
    return res.status(400).json({
      status: "Error",
      message: "Request body is required. Ensure 'Content-Type: application/json' header is sent with a valid JSON body.",
      errors: ["Request body is missing or invalid"]
    });
  }

  const { patientName, doctorName, date, timeSlot } = req.body;

  // Strict validation: check all required fields exist and are non-empty strings
  const errors = [];
  if (!patientName || typeof patientName !== 'string' || patientName.trim() === '') {
    errors.push("patientName is required and cannot be empty");
  }
  if (!doctorName || typeof doctorName !== 'string' || doctorName.trim() === '') {
    errors.push("doctorName is required and cannot be empty");
  }
  if (!date || typeof date !== 'string' || date.trim() === '') {
    errors.push("date is required and cannot be empty (e.g. YYYY-MM-DD)");
  }
  if (!timeSlot || typeof timeSlot !== 'string' || timeSlot.trim() === '') {
    errors.push("timeSlot is required and cannot be empty (e.g. 10:00 AM)");
  }

  // If validation fails, strictly reject with 400 Bad Request
  if (errors.length > 0) {
    return res.status(400).json({
      status: "Error",
      message: "Validation failed: Invalid or missing appointment data",
      errors
    });
  }

  const nextId = appointments.length > 0 ? appointments[appointments.length - 1].id + 1 : 1;
  const newAppointment = {
    id: nextId,
    patientName: patientName.trim(),
    doctorName: doctorName.trim(),
    date: date.trim(),
    timeSlot: timeSlot.trim()
  };

  appointments.push(newAppointment);
  res.status(201).json({
    message: "Appointment successfully booked",
    appointment: newAppointment
  });
});

// Start the server if run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Exercise 5 - Hospital Appointment Booking API running on http://localhost:${PORT}`);
  });
}

module.exports = app;

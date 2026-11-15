# Express.js REST API Exercises (Lab 1 - 6)

Complete backend solutions in Node.js and Express for all 6 API lab exercises, featuring in-memory data models, validation, error handling, automated tests, and a ready-to-import Postman collection.

> 📖 **Postman Testing Guide (Sinhala / Step-by-Step):**  
> Postman එකේ test කරන විදිය පියවරෙන් පියවර විස්තර සහිත සම්පූර්ණ Guide එක සඳහා **[POSTMAN_GUIDE.md](file:///Users/kavindukavindu/Documents/My%20Antigravity%20projects/express-api-exercises/POSTMAN_GUIDE.md)** බලන්න!

---

## Project Structure

```
express-api-exercises/
├── package.json                               # Dependencies and npm scripts
├── exercise1.js                               # Exercise 1: Book Store API
├── exercise2.js                               # Exercise 2: Student Attendance Logger API
├── exercise3.js                               # Exercise 3: Academic Course Grading API
├── exercise4.js                               # Exercise 4: Library Book Search API (Query Params)
├── exercise5.js                               # Exercise 5: Hospital Doctor Appointment Booking API
├── exercise6.js                               # Exercise 6: University Canteen Food Ordering System
├── server.js                                  # Unified server with interactive browser dashboard
├── test_all.js                                # Automated test suite (27 unit/integration tests)
├── express_api_exercises.postman_collection.json # Pre-configured Postman v2.1 collection
└── README.md                                  # Complete documentation & test commands
```

---

## Getting Started

### 1. Prerequisites & Installation
Ensure Node.js is installed. (Node v20+ and Express are already set up in this workspace).

To install dependencies (if needed in a fresh clone):
```bash
npm install
```

### 2. Running Individual Exercises (Port 3000)
Each exercise can be run independently using its dedicated npm script:

| Exercise | Command | Description |
| :--- | :--- | :--- |
| **Exercise 1** | `npm run ex1` | Book Store API |
| **Exercise 2** | `npm run ex2` | Student Attendance Logger API |
| **Exercise 3** | `npm run ex3` | Academic Course Grading API |
| **Exercise 4** | `npm run ex4` | Library Book Search API |
| **Exercise 5** | `npm run ex5` | Hospital Doctor Appointment API |
| **Exercise 6** | `npm run ex6` | University Canteen Food Ordering API |

### 3. Running All-In-One Unified Server
To run all exercises simultaneously under a single server with a browser dashboard:
```bash
npm start
```
Then open `http://localhost:3000` in your web browser.

### 4. Running the Automated Test Suite
To verify all 27 endpoint scenarios across all exercises:
```bash
npm test
```

---

## Detailed Exercise Specifications & Testing Guide

### Exercise 1: Book Store API
- **File:** `exercise1.js`
- **Initial Data:** `[{ id: 1, title: "HTML & CSS", price: 1500 }]`

#### Endpoints:
1. **GET `/api/books`**
   - Returns all books in the catalog.
   - Status: `200 OK`
   - Example:
     ```bash
     curl -X GET http://localhost:3000/api/books
     ```
2. **GET `/api/books/:id`**
   - Returns single book by `id`. Returns `404 Not Found` if missing.
   - Status: `200 OK` / `404 Not Found`
   - Example:
     ```bash
     curl -X GET http://localhost:3000/api/books/1
     ```
3. **POST `/api/books`**
   - Adds a new book to the array with auto-increment `id`.
   - Status: `201 Created`
   - Example:
     ```bash
     curl -X POST http://localhost:3000/api/books \
       -H "Content-Type: application/json" \
       -d '{"title": "Mastering Node.js", "price": 2500}'
     ```

---

### Exercise 2: Student Attendance Logger API
- **File:** `exercise2.js`
- **Initial Data:**
  ```json
  [
    { "id": 1, "regNo": "AS2023001", "studentName": "Kasun", "present": true },
    { "id": 2, "regNo": "AS2023002", "studentName": "Nimasha", "present": false }
  ]
  ```

#### Endpoints:
1. **GET `/api/attendance`**
   - Returns full attendance record.
   - Status: `200 OK`
   - Example:
     ```bash
     curl -X GET http://localhost:3000/api/attendance
     ```
2. **GET `/api/attendance/:id`**
   - Returns record for student with matching ID, or `404 Not Found`.
   - Status: `200 OK` / `404 Not Found`
   - Example:
     ```bash
     curl -X GET http://localhost:3000/api/attendance/1
     ```
3. **POST `/api/attendance`**
   - Receives `regNo` and `studentName` via request body.
   - Automatically assigns `id` and defaults `present: true`.
   - Status: `201 Created`
   - Example:
     ```bash
     curl -X POST http://localhost:3000/api/attendance \
       -H "Content-Type: application/json" \
       -d '{"regNo": "AS2023003", "studentName": "Sithum"}'
     ```

---

### Exercise 3: Academic Course Grading
- **File:** `exercise3.js`
- **Grading Logic:**
  - `marks >= 75` &rarr; `"A"`
  - `marks >= 65` &rarr; `"B"`
  - `marks >= 50` &rarr; `"C"`
  - `marks < 50` &rarr; `"Fail"`

#### Endpoints:
1. **GET `/api/results`**
   - Returns all student results with computed grades.
   - Status: `200 OK`
   - Example:
     ```bash
     curl -X GET http://localhost:3000/api/results
     ```
2. **POST `/api/results`**
   - Client sends `{ "name": "...", "marks": 72 }`.
   - Calculates letter grade, appends to results array, and returns the created object.
   - Status: `201 Created`
   - Example:
     ```bash
     curl -X POST http://localhost:3000/api/results \
       -H "Content-Type: application/json" \
       -d '{"name": "Chathura", "marks": 72}'
     ```
   - Response:
     ```json
     { "id": 3, "name": "Chathura", "marks": 72, "grade": "B" }
     ```

---

### Exercise 4: Library Book Search with Query Parameters
- **File:** `exercise4.js`
- **Initial Data:**
  ```json
  [
    { "id": 1, "title": "C Programming Modern Approach", "category": "Programming", "available": true },
    { "id": 2, "title": "Database Systems", "category": "Database", "available": false },
    { "id": 3, "title": "Web Application Architecture", "category": "Programming", "available": true }
  ]
  ```

#### Endpoints:
1. **GET `/api/books` (Optional Query Param: `category`)**
   - `GET /api/books?category=Programming` &rarr; Returns only books with category `"Programming"`.
   - `GET /api/books` &rarr; Returns all books.
   - Status: `200 OK`
   - Example:
     ```bash
     curl -X GET "http://localhost:3000/api/books?category=Programming"
     ```
2. **GET `/api/books/:id`**
   - Returns book by ID or `404 Not Found`.
   - Status: `200 OK` / `404 Not Found`
   - Example:
     ```bash
     curl -X GET http://localhost:3000/api/books/2
     ```
3. **POST `/api/books`**
   - Adds new book with non-empty string validation on `title` and `category`.
   - Status: `201 Created` (or `400 Bad Request` if invalid)
   - Example:
     ```bash
     curl -X POST http://localhost:3000/api/books \
       -H "Content-Type: application/json" \
       -d '{"title": "Cloud Native Architectures", "category": "Cloud Computing", "available": true}'
     ```

---

### Exercise 5: Hospital Doctor Appointment Booking API
- **File:** `exercise5.js`
- **Initial Data:**
  ```json
  [
    { "id": 1, "patientName": "Sunil Perera", "doctorName": "Dr. Silva", "date": "2026-11-15", "timeSlot": "10:00 AM" }
  ]
  ```

#### Endpoints:
1. **GET `/api/appointments`**
   - List all scheduled appointments.
   - Status: `200 OK`
   - Example:
     ```bash
     curl -X GET http://localhost:3000/api/appointments
     ```
2. **POST `/api/appointments`**
   - Strictly validates `patientName`, `doctorName`, `date`, and `timeSlot`.
   - Returns `400 Bad Request` with error details if any field is missing or empty.
   - Returns `201 Created` on valid submission.
   - Example:
     ```bash
     curl -X POST http://localhost:3000/api/appointments \
       -H "Content-Type: application/json" \
       -d '{
         "patientName": "Anula Weerasinghe",
         "doctorName": "Dr. Jayasuriya",
         "date": "2026-11-25",
         "timeSlot": "11:30 AM"
       }'
     ```

---

### Exercise 6: University Canteen Food Ordering System
- **File:** `exercise6.js`
- **Initial Menu:**
  ```json
  [
    { "id": 1, "item": "Rice and Curry", "price": 250, "stock": 15 },
    { "id": 2, "item": "Fish Bun", "price": 80, "stock": 30 },
    { "id": 3, "item": "Fruit Juice", "price": 120, "stock": 8 }
  ]
  ```

#### Endpoints:
1. **GET `/api/menu`**
   - Displays the current menu items with available stock.
   - Status: `200 OK`
   - Example:
     ```bash
     curl -X GET http://localhost:3000/api/menu
     ```
2. **POST `/api/orders`**
   - Request Body: `{ "itemId": 1, "quantity": 2 }`
   - **Logic:**
     1. Finds item in menu. If not found &rarr; `404 Not Found`.
     2. Checks `item.stock >= quantity`. If insufficient &rarr; `400 Bad Request` with message `"Not enough stock"`.
     3. If valid:
        - Deducts stock: `item.stock -= quantity`
        - Calculates `totalBill = item.price * quantity`
        - Saves to orders: `{ orderId, item, quantity, totalBill }`
        - Returns `201 Created`
   - Example:
     ```bash
     curl -X POST http://localhost:3000/api/orders \
       -H "Content-Type: application/json" \
       -d '{"itemId": 1, "quantity": 2}'
     ```
   - Response:
     ```json
     {
       "orderId": 1,
       "item": "Rice and Curry",
       "quantity": 2,
       "totalBill": 500
     }
     ```
3. **GET `/api/orders`**
   - Lists all placed orders.
   - Status: `200 OK`

---

## Testing Inside Postman

A pre-configured Postman collection is included in this repository:
`express_api_exercises.postman_collection.json`

### Steps to import and test:
1. Open **Postman**.
2. Click **Import** (top left).
3. Drag and drop `express_api_exercises.postman_collection.json` (or click *files* and navigate to `express-api-exercises/express_api_exercises.postman_collection.json`).
4. Start the server for the exercise you want to test (e.g., `npm run ex1` or `npm start`).
5. Open the corresponding exercise folder in Postman and click **Send** on each request!


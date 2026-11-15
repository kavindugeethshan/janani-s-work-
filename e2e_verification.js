// e2e_verification.js - Exhaustive End-to-End Verification for All 6 Exercises
const http = require('http');

function request(app, method, path, body = null) {
  return new Promise((resolve, reject) => {
    const server = http.createServer(app);
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      const payload = body ? JSON.stringify(body) : null;
      const headers = {
        'Accept': 'application/json',
        ...(payload ? {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload)
        } : {})
      };

      const req = http.request({
        hostname: '127.0.0.1',
        port,
        path,
        method,
        headers
      }, (res) => {
        let rawData = '';
        res.on('data', chunk => rawData += chunk);
        res.on('end', () => {
          server.close(() => {
            let json = null;
            try {
              json = JSON.parse(rawData);
            } catch (e) {
              json = rawData;
            }
            resolve({
              statusCode: res.statusCode,
              headers: res.headers,
              body: json
            });
          });
        });
      });

      req.on('error', (err) => {
        server.close(() => reject(err));
      });

      if (payload) {
        req.write(payload);
      }
      req.end();
    });
  });
}

let testIndex = 0;
let passedCount = 0;
let failedCount = 0;

function expect(condition, message, details = "") {
  testIndex++;
  if (condition) {
    console.log(`  ✓ [TEST ${testIndex}] ${message}`);
    passedCount++;
  } else {
    console.error(`  ✗ [FAILED ${testIndex}] ${message} -> Details: ${details}`);
    failedCount++;
  }
}

async function verifyAll() {
  console.log("===============================================================");
  console.log("      COMPREHENSIVE END-TO-END VERIFICATION: EXERCISES 1 - 6   ");
  console.log("===============================================================\n");

  // ==========================================
  // EXERCISE 1: BOOK STORE API
  // ==========================================
  console.log("▶ Verifying Exercise 1: Book Store API");
  const ex1 = require('./exercise1');

  // 1. GET all books
  let r = await request(ex1, 'GET', '/api/books');
  expect(r.statusCode === 200, "GET /api/books returns status 200 OK");
  expect(Array.isArray(r.body) && r.body.length >= 1, "Returns array with initial book");
  expect(r.body[0].title === "HTML & CSS" && r.body[0].price === 1500, "Initial book matches model { id: 1, title: 'HTML & CSS', price: 1500 }");

  // 2. GET book by ID (found)
  r = await request(ex1, 'GET', '/api/books/1');
  expect(r.statusCode === 200, "GET /api/books/1 returns status 200 OK");
  expect(r.body.id === 1 && r.body.title === "HTML & CSS", "Book data is correct");

  // 3. GET book by ID (not found)
  r = await request(ex1, 'GET', '/api/books/999');
  expect(r.statusCode === 404, "GET /api/books/999 returns status 404 Not Found");
  expect(r.body.message === "Book not found", "Returns error message 'Book not found'");

  // 4. POST add new book
  r = await request(ex1, 'POST', '/api/books', { title: "Node.js In Depth", price: 3200 });
  expect(r.statusCode === 201, "POST /api/books returns status 201 Created");
  expect(r.body.id === 2 && r.body.title === "Node.js In Depth" && r.body.price === 3200, "New book has auto-assigned id and correct properties");

  // 5. Verify array was updated
  r = await request(ex1, 'GET', '/api/books');
  expect(r.body.length === 2 && r.body[1].title === "Node.js In Depth", "GET /api/books reflects newly added book in array");

  // ==========================================
  // EXERCISE 2: STUDENT ATTENDANCE LOGGER API
  // ==========================================
  console.log("\n▶ Verifying Exercise 2: Student Attendance Logger API");
  const ex2 = require('./exercise2');

  // 1. GET all attendance
  r = await request(ex2, 'GET', '/api/attendance');
  expect(r.statusCode === 200, "GET /api/attendance returns status 200 OK");
  expect(r.body.length === 2, "Returns initial 2 student attendance records");
  expect(r.body[0].regNo === "AS2023001" && r.body[0].present === true, "Student 1: Kasun, present: true");
  expect(r.body[1].regNo === "AS2023002" && r.body[1].present === false, "Student 2: Nimasha, present: false");

  // 2. GET attendance by ID
  r = await request(ex2, 'GET', '/api/attendance/2');
  expect(r.statusCode === 200, "GET /api/attendance/2 returns status 200 OK");
  expect(r.body.studentName === "Nimasha" && r.body.present === false, "Returns matching student record");

  // 3. GET attendance by non-existent ID
  r = await request(ex2, 'GET', '/api/attendance/888');
  expect(r.statusCode === 404, "GET /api/attendance/888 returns status 404 Not Found");
  expect(r.body.message === "Attendance record not found", "Returns 404 message");

  // 4. POST record attendance
  r = await request(ex2, 'POST', '/api/attendance', { regNo: "AS2023003", studentName: "Kasunka" });
  expect(r.statusCode === 201, "POST /api/attendance returns status 201 Created");
  expect(r.body.id === 3 && r.body.regNo === "AS2023003", "Auto-increment ID 3 assigned");
  expect(r.body.present === true, "Defaults 'present' to true automatically");

  // 5. POST validation (missing fields)
  r = await request(ex2, 'POST', '/api/attendance', { regNo: "AS2023004" });
  expect(r.statusCode === 400, "POST missing studentName returns 400 Bad Request");

  // ==========================================
  // EXERCISE 3: ACADEMIC COURSE GRADING API
  // ==========================================
  console.log("\n▶ Verifying Exercise 3: Academic Course Grading API");
  const ex3 = require('./exercise3');

  // 1. GET all results
  r = await request(ex3, 'GET', '/api/results');
  expect(r.statusCode === 200, "GET /api/results returns status 200 OK");
  expect(r.body.length === 2, "Returns 2 initial results");

  // 2. POST grade boundary tests
  // marks >= 75 -> "A"
  r = await request(ex3, 'POST', '/api/results', { name: "Anura", marks: 75 });
  expect(r.statusCode === 201 && r.body.grade === "A", "Marks 75 yields Grade A (>= 75)");

  // marks >= 65 and < 75 -> "B"
  r = await request(ex3, 'POST', '/api/results', { name: "Bimal", marks: 74 });
  expect(r.statusCode === 201 && r.body.grade === "B", "Marks 74 yields Grade B (< 75)");

  r = await request(ex3, 'POST', '/api/results', { name: "Bimal 2", marks: 65 });
  expect(r.statusCode === 201 && r.body.grade === "B", "Marks 65 yields Grade B (>= 65)");

  // marks >= 50 and < 65 -> "C"
  r = await request(ex3, 'POST', '/api/results', { name: "Chandana", marks: 64 });
  expect(r.statusCode === 201 && r.body.grade === "C", "Marks 64 yields Grade C (< 65)");

  r = await request(ex3, 'POST', '/api/results', { name: "Chandana 2", marks: 50 });
  expect(r.statusCode === 201 && r.body.grade === "C", "Marks 50 yields Grade C (>= 50)");

  // marks < 50 -> "Fail"
  r = await request(ex3, 'POST', '/api/results', { name: "Danuka", marks: 49 });
  expect(r.statusCode === 201 && r.body.grade === "Fail", "Marks 49 yields Grade Fail (< 50)");

  r = await request(ex3, 'POST', '/api/results', { name: "Danuka 2", marks: 0 });
  expect(r.statusCode === 201 && r.body.grade === "Fail", "Marks 0 yields Grade Fail");

  // Validation: negative or invalid marks
  r = await request(ex3, 'POST', '/api/results', { name: "Invalid", marks: -10 });
  expect(r.statusCode === 400, "Negative marks returns 400 Bad Request");

  // ==========================================
  // EXERCISE 4: LIBRARY BOOK SEARCH WITH QUERY PARAMETERS
  // ==========================================
  console.log("\n▶ Verifying Exercise 4: Library Book Search with Query Parameters");
  const ex4 = require('./exercise4');

  // 1. GET all books
  r = await request(ex4, 'GET', '/api/books');
  expect(r.statusCode === 200, "GET /api/books returns 200 OK");
  expect(r.body.length === 3, "Returns all 3 catalog books");

  // 2. GET books with ?category=Programming
  r = await request(ex4, 'GET', '/api/books?category=Programming');
  expect(r.statusCode === 200, "GET /api/books?category=Programming returns 200 OK");
  expect(r.body.length === 2 && r.body.every(b => b.category === "Programming"), "Only books with category 'Programming' returned");

  // 3. GET books with ?category=Database
  r = await request(ex4, 'GET', '/api/books?category=Database');
  expect(r.statusCode === 200 && r.body.length === 1 && r.body[0].title === "Database Systems", "Returns only 1 book for category 'Database'");

  // 4. GET books by ID (found vs 404)
  r = await request(ex4, 'GET', '/api/books/3');
  expect(r.statusCode === 200 && r.body.title === "Web Application Architecture", "GET /api/books/3 returns correct book");

  r = await request(ex4, 'GET', '/api/books/404');
  expect(r.statusCode === 404 && r.body.message === "Book not found", "GET /api/books/404 returns 404 Not Found");

  // 5. POST validation: empty string check
  r = await request(ex4, 'POST', '/api/books', { title: "", category: "Programming" });
  expect(r.statusCode === 400, "Empty title rejected with 400 Bad Request");

  r = await request(ex4, 'POST', '/api/books', { title: "   ", category: "Programming" });
  expect(r.statusCode === 400, "Whitespace-only title rejected with 400 Bad Request");

  r = await request(ex4, 'POST', '/api/books', { title: "Valid Title", category: "  " });
  expect(r.statusCode === 400, "Whitespace-only category rejected with 400 Bad Request");

  // 6. POST valid book
  r = await request(ex4, 'POST', '/api/books', { title: "Microservices Architecture", category: "Software Architecture" });
  expect(r.statusCode === 201 && r.body.id === 4 && r.body.available === true, "Valid book added with 201 Created and default available: true");

  // ==========================================
  // EXERCISE 5: HOSPITAL DOCTOR APPOINTMENT BOOKING API
  // ==========================================
  console.log("\n▶ Verifying Exercise 5: Hospital Doctor Appointment Booking API");
  const ex5 = require('./exercise5');

  // 1. GET all appointments
  r = await request(ex5, 'GET', '/api/appointments');
  expect(r.statusCode === 200, "GET /api/appointments returns 200 OK");
  expect(r.body.length === 1 && r.body[0].patientName === "Sunil Perera", "Initial appointment present");

  // 2. POST strict validation checks
  r = await request(ex5, 'POST', '/api/appointments', {});
  expect(r.statusCode === 400 && r.body.errors.length === 4, "Empty body strictly rejected with all 4 error messages");

  r = await request(ex5, 'POST', '/api/appointments', {
    patientName: "Kamal",
    doctorName: "Dr. Silva",
    date: ""
  });
  expect(r.statusCode === 400 && r.body.errors.includes("date is required and cannot be empty (e.g. YYYY-MM-DD)"), "Empty date strictly rejected");

  // 3. POST valid appointment
  r = await request(ex5, 'POST', '/api/appointments', {
    patientName: "Malkanthi Silva",
    doctorName: "Dr. Ranasinghe",
    date: "2026-11-28",
    timeSlot: "04:30 PM"
  });
  expect(r.statusCode === 201, "Valid appointment returns 201 Created");
  expect(r.body.appointment.id === 2 && r.body.appointment.patientName === "Malkanthi Silva", "Appointment successfully recorded");

  // Verify list grew to 2
  r = await request(ex5, 'GET', '/api/appointments');
  expect(r.body.length === 2, "Appointments list updated to 2 entries");

  // ==========================================
  // EXERCISE 6: UNIVERSITY CANTEEN FOOD ORDERING SYSTEM
  // ==========================================
  console.log("\n▶ Verifying Exercise 6: University Canteen Food Ordering System");
  const ex6 = require('./exercise6');

  // 1. GET menu
  r = await request(ex6, 'GET', '/api/menu');
  expect(r.statusCode === 200, "GET /api/menu returns 200 OK");
  expect(r.body.length === 3, "All 3 menu items listed");

  const riceBefore = r.body.find(i => i.id === 1);
  const juiceBefore = r.body.find(i => i.id === 3);
  expect(riceBefore.stock === 15, "Initial Rice and Curry stock is 15");
  expect(juiceBefore.stock === 8, "Initial Fruit Juice stock is 8");

  // 2. Unknown itemId -> 404
  r = await request(ex6, 'POST', '/api/orders', { itemId: 999, quantity: 1 });
  expect(r.statusCode === 404 && r.body.message === "Item not found", "Unknown itemId returns 404 Not Found");

  // 3. Insufficient stock -> 400 Bad Request with message "Not enough stock"
  r = await request(ex6, 'POST', '/api/orders', { itemId: 3, quantity: 10 });
  expect(r.statusCode === 400 && r.body.message === "Not enough stock", "Quantity 10 > Stock 8 returns 400 'Not enough stock'");

  // Check Juice stock unchanged
  r = await request(ex6, 'GET', '/api/menu');
  expect(r.body.find(i => i.id === 3).stock === 8, "Fruit Juice stock remained at 8 after failed order");

  // 4. Valid order: Item 1 (Rice and Curry: price 250, stock 15, order 2)
  r = await request(ex6, 'POST', '/api/orders', { itemId: 1, quantity: 2 });
  expect(r.statusCode === 201, "Valid order returns 201 Created");
  expect(r.body.orderId === 1, "Order assigned orderId: 1");
  expect(r.body.item === "Rice and Curry", "Item name correctly recorded");
  expect(r.body.quantity === 2, "Quantity is 2");
  expect(r.body.totalBill === 500, "Calculated totalBill is 500 (250 * 2)");

  // Verify stock deduction
  r = await request(ex6, 'GET', '/api/menu');
  const riceAfter = r.body.find(i => i.id === 1);
  expect(riceAfter.stock === 13, "Rice and Curry stock deducted from 15 to 13 (15 - 2)");

  // 5. GET orders history
  r = await request(ex6, 'GET', '/api/orders');
  expect(r.statusCode === 200 && r.body.length === 1 && r.body[0].totalBill === 500, "GET /api/orders returns the saved order");

  // ==========================================
  // UNIFIED SERVER (server.js) TEST
  // ==========================================
  console.log("\n▶ Verifying Unified Server (server.js)");
  const unifiedServer = require('./server');

  r = await request(unifiedServer, 'GET', '/');
  expect(r.statusCode === 200, "GET / returns 200 OK");
  expect(typeof r.body === 'string' && r.body.includes("Express API Exercises"), "Returns HTML dashboard");

  r = await request(unifiedServer, 'GET', '/ex1/api/books');
  expect(r.statusCode === 200 && Array.isArray(r.body), "Unified route /ex1/api/books functions correctly");

  r = await request(unifiedServer, 'GET', '/ex6/api/menu');
  expect(r.statusCode === 200 && Array.isArray(r.body), "Unified route /ex6/api/menu functions correctly");

  // ==========================================
  // SUMMARY
  // ==========================================
  console.log("\n===============================================================");
  console.log(` E2E RESULT: ${passedCount} PASSED / ${failedCount} FAILED (TOTAL: ${testIndex})`);
  console.log("===============================================================");

  if (failedCount === 0) {
    console.log("🎉 ALL ENDPOINTS FULLY VERIFIED END-TO-END! 100% OPERATIONAL!");
    process.exit(0);
  } else {
    console.error(`❌ ${failedCount} tests failed.`);
    process.exit(1);
  }
}

verifyAll().catch(err => {
  console.error("Critical test runner failure:", err);
  process.exit(1);
});


// test_all.js - Automated tests for Exercises 1 to 6
const http = require('http');

function makeRequest(app, method, path, body = null) {
  return new Promise((resolve, reject) => {
    const server = http.createServer(app);
    server.listen(0, () => {
      const port = server.address().port;
      const payload = body ? JSON.stringify(body) : null;
      const options = {
        hostname: '127.0.0.1',
        port: port,
        path: path,
        method: method,
        headers: {
          'Content-Type': 'application/json',
          ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {})
        }
      };

      const req = http.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          server.close(() => {
            let parsed = null;
            try {
              parsed = JSON.parse(data);
            } catch (e) {
              parsed = data;
            }
            resolve({ status: res.statusCode, data: parsed });
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

async function runTests() {
  console.log("==================================================");
  console.log("   RUNNING AUTOMATED TESTS FOR EXERCISES 1 TO 6   ");
  console.log("==================================================\n");

  let passed = 0;
  let total = 0;

  function assert(condition, testName, details = "") {
    total++;
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passed++;
    } else {
      console.error(`[FAIL] ${testName} - ${details}`);
    }
  }

  // --- EXERCISE 1 ---
  console.log("--- Testing Exercise 1: Book Store API ---");
  const ex1 = require('./exercise1');
  let res = await makeRequest(ex1, 'GET', '/api/books');
  assert(res.status === 200 && Array.isArray(res.data) && res.data.length >= 1, "GET /api/books returns book array");

  res = await makeRequest(ex1, 'GET', '/api/books/1');
  assert(res.status === 200 && res.data.id === 1 && res.data.title === "HTML & CSS", "GET /api/books/1 returns single book");

  res = await makeRequest(ex1, 'GET', '/api/books/999');
  assert(res.status === 404, "GET /api/books/999 returns 404 Not Found");

  res = await makeRequest(ex1, 'POST', '/api/books', { title: "JavaScript Fundamentals", price: 2200 });
  assert(res.status === 201 && res.data.id === 2 && res.data.title === "JavaScript Fundamentals", "POST /api/books adds new book with 201 Created");

  // --- EXERCISE 2 ---
  console.log("\n--- Testing Exercise 2: Student Attendance Logger API ---");
  const ex2 = require('./exercise2');
  res = await makeRequest(ex2, 'GET', '/api/attendance');
  assert(res.status === 200 && res.data.length >= 2, "GET /api/attendance returns full attendance list");

  res = await makeRequest(ex2, 'GET', '/api/attendance/1');
  assert(res.status === 200 && res.data.regNo === "AS2023001" && res.data.studentName === "Kasun", "GET /api/attendance/1 returns Kasun's attendance");

  res = await makeRequest(ex2, 'GET', '/api/attendance/999');
  assert(res.status === 404, "GET /api/attendance/999 returns 404 Not Found");

  res = await makeRequest(ex2, 'POST', '/api/attendance', { regNo: "AS2023003", studentName: "Dinuka" });
  assert(res.status === 201 && res.data.id === 3 && res.data.present === true, "POST /api/attendance auto-increments id & sets default present: true");

  // --- EXERCISE 3 ---
  console.log("\n--- Testing Exercise 3: Academic Course Grading API ---");
  const ex3 = require('./exercise3');
  res = await makeRequest(ex3, 'GET', '/api/results');
  assert(res.status === 200 && res.data.length >= 2, "GET /api/results returns student results");

  res = await makeRequest(ex3, 'POST', '/api/results', { name: "Anura", marks: 78 });
  assert(res.status === 201 && res.data.grade === "A", "POST /api/results (marks: 78) gives Grade A");

  res = await makeRequest(ex3, 'POST', '/api/results', { name: "Kamal", marks: 68 });
  assert(res.status === 201 && res.data.grade === "B", "POST /api/results (marks: 68) gives Grade B");

  res = await makeRequest(ex3, 'POST', '/api/results', { name: "Nimal", marks: 54 });
  assert(res.status === 201 && res.data.grade === "C", "POST /api/results (marks: 54) gives Grade C");

  res = await makeRequest(ex3, 'POST', '/api/results', { name: "Sunil", marks: 32 });
  assert(res.status === 201 && res.data.grade === "Fail", "POST /api/results (marks: 32) gives Grade Fail");

  // --- EXERCISE 4 ---
  console.log("\n--- Testing Exercise 4: Library Book Search with Query Params ---");
  const ex4 = require('./exercise4');
  res = await makeRequest(ex4, 'GET', '/api/books');
  assert(res.status === 200 && res.data.length === 3, "GET /api/books returns all 3 library books");

  res = await makeRequest(ex4, 'GET', '/api/books?category=Programming');
  assert(res.status === 200 && res.data.length === 2 && res.data.every(b => b.category === "Programming"), "GET /api/books?category=Programming filters by category");

  res = await makeRequest(ex4, 'GET', '/api/books/2');
  assert(res.status === 200 && res.data.title === "Database Systems", "GET /api/books/2 returns single book");

  res = await makeRequest(ex4, 'GET', '/api/books/999');
  assert(res.status === 404, "GET /api/books/999 returns 404 Not Found");

  res = await makeRequest(ex4, 'POST', '/api/books', { title: "   ", category: "Programming" });
  assert(res.status === 400, "POST /api/books with empty title fails with 400 Bad Request");

  res = await makeRequest(ex4, 'POST', '/api/books', { title: "Node.js Design Patterns", category: "Programming" });
  assert(res.status === 201 && res.data.title === "Node.js Design Patterns", "POST /api/books with valid title/category succeeds with 201");

  // --- EXERCISE 5 ---
  console.log("\n--- Testing Exercise 5: Hospital Appointment Booking API ---");
  const ex5 = require('./exercise5');
  res = await makeRequest(ex5, 'GET', '/api/appointments');
  assert(res.status === 200 && res.data.length >= 1, "GET /api/appointments returns appointments array");

  res = await makeRequest(ex5, 'POST', '/api/appointments', { patientName: "Nimal Perera" });
  assert(res.status === 400, "POST /api/appointments missing fields strictly returns 400 Bad Request");

  res = await makeRequest(ex5, 'POST', '/api/appointments', {
    patientName: "Kamala Wickrama",
    doctorName: "Dr. Fernando",
    date: "2026-11-20",
    timeSlot: "02:30 PM"
  });
  assert(res.status === 201 && res.data.appointment.patientName === "Kamala Wickrama", "POST /api/appointments with valid body returns 201 Created");

  // --- EXERCISE 6 ---
  console.log("\n--- Testing Exercise 6: University Canteen Food Ordering System ---");
  const ex6 = require('./exercise6');
  res = await makeRequest(ex6, 'GET', '/api/menu');
  assert(res.status === 200 && res.data.length === 3, "GET /api/menu returns food items with stock");

  // Invalid item id
  res = await makeRequest(ex6, 'POST', '/api/orders', { itemId: 999, quantity: 2 });
  assert(res.status === 404, "POST /api/orders with unknown itemId returns 404 Not Found");

  // Insufficient stock (Fruit Juice stock is 8, ask for 50)
  res = await makeRequest(ex6, 'POST', '/api/orders', { itemId: 3, quantity: 50 });
  assert(res.status === 400 && res.data.message === "Not enough stock", "POST /api/orders with excess quantity returns 400 'Not enough stock'");

  // Valid order (Rice and Curry: price 250, initial stock 15, order 2 => bill: 500, new stock: 13)
  res = await makeRequest(ex6, 'POST', '/api/orders', { itemId: 1, quantity: 2 });
  assert(res.status === 201 && res.data.totalBill === 500 && res.data.quantity === 2 && res.data.item === "Rice and Curry", "POST /api/orders places valid order and returns 201 with totalBill: 500");

  // Verify stock deduction
  res = await makeRequest(ex6, 'GET', '/api/menu');
  const riceItem = res.data.find(m => m.id === 1);
  assert(riceItem.stock === 13, "Menu stock for Rice and Curry deducted correctly from 15 to 13");

  console.log("\n==================================================");
  console.log(`TOTAL TESTS: ${total} | PASSED: ${passed} | FAILED: ${total - passed}`);
  console.log("==================================================");
  process.exit(total === passed ? 0 : 1);
}

runTests().catch(err => {
  console.error("Test error:", err);
  process.exit(1);
});


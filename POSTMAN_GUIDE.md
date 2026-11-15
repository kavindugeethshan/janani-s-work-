# 📮 Postman Testing Guide - Express API Exercises (1 - 6)

මෙම Guide එකෙන් ඔයාලට Exercises 1 සිට 6 දක්වා තියෙන සියලුම API endpoints **Postman** හරහා test කරන්නේ කොහොමද කියලා පියවරෙන් පියවර (Step-by-Step) බලාගන්න පුළුවන්.

---

## ⚡ ක්‍රම 2 කින් Test කරන්න පුළුවන්:
1. **පහසුම ක්‍රමය (Method 1 - Recommended):** කලින් සාදා ඇති Postman Collection එක Direct Import කර ක්ලික් එකෙන් Test කිරීම.
2. **සාමාන්‍ය ක්‍රමය (Method 2 - Manual):** Postman එකේ අලුතින් Requests සාදා Method, URL, Headers සහ JSON Body ඇතුළත් කර Test කිරීම.

---

## 🚀 ක්‍රමය 1: Ready-made Collection එක Postman එකට Import කිරීම (ඉතා පහසුයි)

මම මේ project එක ඇතුලෙම `express_api_exercises.postman_collection.json` කියලා file එකක් හදලා තියෙනවා. ඒකෙ සියලුම Endpoints, Headers සහ Request Bodies කලින්ම සකස් කරලා තියෙන්නේ.

1. **Postman App** එක Open කරන්න.
2. වම් පැත්තේ ඉහළ ඇති **Import** බටන් එක click කරන්න.
3. මෙම Project Folder එකේ ඇති **`express_api_exercises.postman_collection.json`** file එක drag & drop කරන්න (හෝ Browse කර තෝරන්න).
4. දැන් Postman හි Collections යටතේ **"Node Express API Lab - Exercises 1 to 6"** නමින් folder එකක් දිස්වේ.
5. VS Code / Terminal එකේ අදාළ Exercise එක Run කරන්න (උදා: `npm run ex1`).
6. Postman එකේ අදාළ Request එක තෝරා **Send** ඔබන්න!

---

## 🛠️ ක්‍රමය 2: Manual Testing (අතින් Request එකින් එක හදන විදිය)

ඕනෑම Exercise එකක් manual test කරන්න කලින් Terminal එකේ එම Exercise එක Start කරගත යුතුය:

```bash
# Exercise 1 Run කිරීමට:
npm run ex1

# Exercise 2 Run කිරීමට:
npm run ex2

# Exercise 3 Run කිරීමට:
npm run ex3

# Exercise 4 Run කිරීමට:
npm run ex4

# Exercise 5 Run කිරීමට:
npm run ex5

# Exercise 6 Run කිරීමට:
npm run ex6
```

> **සටහන:** සියලුම Exercises default ලෙස run වන්නේ `http://localhost:3000` port එකේය.

---

### 📌 Postman එකේ POST Request එකක් යවන සාමාන්‍ය පියවර:
1. **HTTP Method** එක තෝරන්න (`GET` හෝ `POST`).
2. **URL** එක ඇතුළත් කරන්න (උදා: `http://localhost:3000/api/books`).
3. **POST** request එකක් නම්:
   - URL එකට පහළින් ඇති **Body** ටැබ් එක click කරන්න.
   - **raw** radio button එක තෝරන්න.
   - දකුණු පස Dropdown එකෙන් **Text** වෙනුවට **JSON** තෝරන්න.
   - පහත පෙට්ටියේ JSON code එක paste කරන්න.
4. නිල් පාට **Send** බටන් එක click කරන්න.
5. පහළින් Response Status එක (`200 OK`, `201 Created`, `400 Bad Request`, `404 Not Found`) සහ Data දිස්වේ.

```
+-----------------------------------------------------------------------+
| POST  v | http://localhost:3000/api/books                  | [ Send ] |
+-----------------------------------------------------------------------+
  Params  |  Authorization  |  Headers (1)  |  [Body]  |  Tests
                                                v
  ( ) none   ( ) form-data   ( ) x-www-form-urlencoded   (*) raw [ JSON v ]
  -----------------------------------------------------------------------
  {
    "title": "Mastering Node.js",
    "price": 2500
  }
```

---

## 1️⃣ Exercise 1: Book Store API Testing

Terminal එකේ run කරන්න: `npm run ex1`

### Request 1.1: Return all books
- **Method:** `GET`
- **URL:** `http://localhost:3000/api/books`
- **Body:** None
- **Expected Status:** `200 OK`
- **Expected Output:**
  ```json
  [
    {
      "id": 1,
      "title": "HTML & CSS",
      "price": 1500
    }
  ]
  ```

### Request 1.2: Return single book by ID
- **Method:** `GET`
- **URL:** `http://localhost:3000/api/books/1`
- **Body:** None
- **Expected Status:** `200 OK`
- **Expected Output:**
  ```json
  {
    "id": 1,
    "title": "HTML & CSS",
    "price": 1500
  }
  ```
- *(Optional Test)*: නැති ID එකක් දුන්නොත් (`http://localhost:3000/api/books/99`) &rarr; Status `404 Not Found`.

### Request 1.3: Add a new book
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/books`
- **Body:** `raw` &rarr; `JSON`
  ```json
  {
    "title": "Mastering Node.js",
    "price": 2500
  }
  ```
- **Expected Status:** `201 Created`
- **Expected Output:**
  ```json
  {
    "id": 2,
    "title": "Mastering Node.js",
    "price": 2500
  }
  ```

---

## 2️⃣ Exercise 2: Student Attendance Logger API Testing

Terminal එකේ run කරන්න: `npm run ex2`

### Request 2.1: Full attendance record
- **Method:** `GET`
- **URL:** `http://localhost:3000/api/attendance`
- **Body:** None
- **Expected Status:** `200 OK`
- **Expected Output:**
  ```json
  [
    { "id": 1, "regNo": "AS2023001", "studentName": "Kasun", "present": true },
    { "id": 2, "regNo": "AS2023002", "studentName": "Nimasha", "present": false }
  ]
  ```

### Request 2.2: Attendance record for student by ID
- **Method:** `GET`
- **URL:** `http://localhost:3000/api/attendance/1`
- **Expected Status:** `200 OK`
- **404 Test:** `http://localhost:3000/api/attendance/999` &rarr; Status `404 Not Found`.

### Request 2.3: Record attendance (Auto-ID & default present: true)
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/attendance`
- **Body:** `raw` &rarr; `JSON`
  ```json
  {
    "regNo": "AS2023003",
    "studentName": "Dinuka"
  }
  ```
- **Expected Status:** `201 Created`
- **Expected Output:**
  ```json
  {
    "id": 3,
    "regNo": "AS2023003",
    "studentName": "Dinuka",
    "present": true
  }
  ```

---

## 3️⃣ Exercise 3: Academic Course Grading API Testing

Terminal එකේ run කරන්න: `npm run ex3`

### Request 3.1: View all results
- **Method:** `GET`
- **URL:** `http://localhost:3000/api/results`
- **Expected Status:** `200 OK`

### Request 3.2: Add student & Calculate letter grade
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/results`
- **Body:** `raw` &rarr; `JSON`

#### Grade A Test (Marks >= 75):
```json
{
  "name": "Chathura",
  "marks": 82
}
```
*Expected Response:* Status `201 Created`, `"grade": "A"`

#### Grade B Test (Marks >= 65):
```json
{
  "name": "Hiruni",
  "marks": 68
}
```
*Expected Response:* Status `201 Created`, `"grade": "B"`

#### Grade C Test (Marks >= 50):
```json
{
  "name": "Ravi",
  "marks": 54
}
```
*Expected Response:* Status `201 Created`, `"grade": "C"`

#### Fail Test (Marks < 50):
```json
{
  "name": "Bawantha",
  "marks": 42
}
```
*Expected Response:* Status `201 Created`, `"grade": "Fail"`

---

## 4️⃣ Exercise 4: Library Book Search with Query Parameters

Terminal එකේ run කරන්න: `npm run ex4`

### Request 4.1: Get all books (Without query parameter)
- **Method:** `GET`
- **URL:** `http://localhost:3000/api/books`
- **Expected Status:** `200 OK` (සියලුම පොත් 3 ම ලැබේ)

### Request 4.2: Filter by category (Query parameter)
- **Method:** `GET`
- **URL:** `http://localhost:3000/api/books?category=Programming`
- *(Postman හි Params ටැබ් එකේ Key = `category`, Value = `Programming` ලෙසද දිය හැක)*
- **Expected Status:** `200 OK`
- **Expected Output:** "Programming" category එකට අදාළ පොත් 2 පමණක් filter වී ලැබේ:
  ```json
  [
    {
      "id": 1,
      "title": "C Programming Modern Approach",
      "category": "Programming",
      "available": true
    },
    {
      "id": 3,
      "title": "Web Application Architecture",
      "category": "Programming",
      "available": true
    }
  ]
  ```

### Request 4.3: Get single book by ID
- **Method:** `GET`
- **URL:** `http://localhost:3000/api/books/2`
- **Expected Status:** `200 OK` (Database Systems පොත ලැබේ)

### Request 4.4: Add new book (Validation Check)
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/books`
- **Valid Body:**
  ```json
  {
    "title": "Clean Code",
    "category": "Programming",
    "available": true
  }
  ```
  *Expected Status:* `201 Created`
- **Invalid Body Test (Empty title or category):**
  ```json
  {
    "title": "",
    "category": "Programming"
  }
  ```
  *Expected Status:* `400 Bad Request` ("Validation failed...")

---

## 5️⃣ Exercise 5: Hospital Doctor Appointment Booking API

Terminal එකේ run කරන්න: `npm run ex5`

### Request 5.1: List all scheduled appointments
- **Method:** `GET`
- **URL:** `http://localhost:3000/api/appointments`
- **Expected Status:** `200 OK`

### Request 5.2: Book an appointment (Successful)
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/appointments`
- **Body:** `raw` &rarr; `JSON`
  ```json
  {
    "patientName": "Anula Weerasinghe",
    "doctorName": "Dr. Jayasuriya",
    "date": "2026-11-25",
    "timeSlot": "11:30 AM"
  }
  ```
- **Expected Status:** `201 Created`
- **Expected Output:**
  ```json
  {
    "message": "Appointment successfully booked",
    "appointment": {
      "id": 2,
      "patientName": "Anula Weerasinghe",
      "doctorName": "Dr. Jayasuriya",
      "date": "2026-11-25",
      "timeSlot": "11:30 AM"
    }
  }
  ```

### Request 5.3: Strict Validation Failure Test
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/appointments`
- **Body (Missing doctorName and timeSlot):**
  ```json
  {
    "patientName": "Sunil",
    "date": "2026-11-25"
  }
  ```
- **Expected Status:** `400 Bad Request`
- **Expected Output:**
  ```json
  {
    "status": "Error",
    "message": "Validation failed: Invalid or missing appointment data",
    "errors": [
      "doctorName is required and cannot be empty",
      "timeSlot is required and cannot be empty (e.g. 10:00 AM)"
    ]
  }
  ```

---

## 6️⃣ Exercise 6: University Canteen Food Ordering System

Terminal එකේ run කරන්න: `npm run ex6`

### Request 6.1: View food menu and current stock
- **Method:** `GET`
- **URL:** `http://localhost:3000/api/menu`
- **Expected Status:** `200 OK`
- **Output:** Rice and Curry (Stock: 15), Fish Bun (Stock: 30), Fruit Juice (Stock: 8)

### Request 6.2: Place a valid order
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/orders`
- **Body:** `raw` &rarr; `JSON`
  ```json
  {
    "itemId": 1,
    "quantity": 2
  }
  ```
- **Server Process:**
  - Item 1 (Rice and Curry, Price 250) සොයා ගනී.
  - Stock 15 >= 2 බැවින් stock එක 13 දක්වා අඩු කරයි.
  - Bill = $250 \times 2 = 500$ ලෙස ගණනය කරයි.
- **Expected Status:** `201 Created`
- **Expected Output:**
  ```json
  {
    "orderId": 1,
    "item": "Rice and Curry",
    "quantity": 2,
    "totalBill": 500
  }
  ```

### Request 6.3: Insufficient Stock Test (Bad Request)
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/orders`
- **Body (Fruit Juice stock is only 8, we ask for 20):**
  ```json
  {
    "itemId": 3,
    "quantity": 20
  }
  ```
- **Expected Status:** `400 Bad Request`
- **Expected Output:**
  ```json
  {
    "message": "Not enough stock"
  }
  ```

### Request 6.4: Item Not Found Test
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/orders`
- **Body:**
  ```json
  {
    "itemId": 999,
    "quantity": 1
  }
  ```
- **Expected Status:** `404 Not Found`
- **Expected Output:**
  ```json
  {
    "message": "Item not found"
  }
  ```

### Request 6.5: View Placed Orders History
- **Method:** `GET`
- **URL:** `http://localhost:3000/api/orders`
- **Expected Status:** `200 OK` (Place කළ සියලුම Orders දැකගත හැක)

---

## 💡 Quick Tips:
- **Port Conflict එකක් ආවොත්:** කලින් run වෙන node process එකක් නවත්වන්න (`CTRL + C` ඔබන්න).
- **සියලුම Exercises එකවර test කිරීමට:** `npm start` run කර Postman හි URL එකට `/ex1`, `/ex2`... ආදී වශයෙන් prefix එක භාවිතා කළ හැක (උදා: `http://localhost:3000/ex1/api/books`).


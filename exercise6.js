// Exercise 6: University Canteen Food Ordering System API
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-memory data models
let menu = [
  { id: 1, item: "Rice and Curry", price: 250, stock: 15 },
  { id: 2, item: "Fish Bun", price: 80, stock: 30 },
  { id: 3, item: "Fruit Juice", price: 120, stock: 8 }
];

let orders = [];

// 1. GET /api/menu — Display the food menu with current available stock
app.get('/api/menu', (req, res) => {
  res.status(200).json(menu);
});

// GET /api/orders — Retrieve all placed orders (useful for checking order history)
app.get('/api/orders', (req, res) => {
  res.status(200).json(orders);
});

// 2. POST /api/orders — Place a food order
app.post('/api/orders', (req, res) => {
  const { itemId, quantity } = req.body;

  // Validate inputs
  if (itemId === undefined || quantity === undefined) {
    return res.status(400).json({ message: "Both itemId and quantity are required." });
  }

  const parsedItemId = parseInt(itemId);
  const parsedQuantity = parseInt(quantity);

  if (isNaN(parsedItemId) || isNaN(parsedQuantity) || parsedQuantity <= 0) {
    return res.status(400).json({ message: "quantity must be a positive integer." });
  }

  // 1. Find the item in menu using itemId
  const item = menu.find(m => m.id === parsedItemId);
  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  // 2. Check if item.stock >= quantity
  if (item.stock < parsedQuantity) {
    return res.status(400).json({ message: "Not enough stock" });
  }

  // 3. If valid:
  // - Deduct stock
  item.stock -= parsedQuantity;

  // - Calculate total bill
  const totalBill = item.price * parsedQuantity;

  // - Save to orders array
  const orderRecord = {
    orderId: orders.length + 1,
    item: item.item,
    quantity: parsedQuantity,
    totalBill
  };
  orders.push(orderRecord);

  // - Return status 201 Created with order details
  res.status(201).json(orderRecord);
});

// Start the server if run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Exercise 6 - University Canteen API running on http://localhost:${PORT}`);
  });
}

module.exports = app;

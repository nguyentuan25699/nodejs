import type e = require("express");

const express = require('express')
const app = express();
const PORT = 3000;

let items = [
  {
    id: 1,
    name: "Apple",
    price: 100000,
    category: "fruit"
  },
  {
    id: 2,
    name: "Strawberry",
    price: 500000,
    category: "fruit"
  }, {
    id: 3,
    name: "Grape",
    price: 300000,
    category: "fruit"
  },
  {
    id: 4,
    name: "Apple Juice",
    price: 50000,
    category: "juice"
  },
  {
    id: 5,
    name: "Grape Juice",
    price: 100000,
    category: "juice"
  },
]

app.use((req: e.Request, res: e.Response, next: e.NextFunction) => {
  const startTime = Date.now();

  console.log(`Start request: ${req.method} ${req.url} - ${startTime}`);

  res.on('finish', () => {
    console.log(`${req.method} ${res.statusCode} - ${req.url} ${(Date.now() - startTime)}ms`);

  });

  next();
})
app.use(express.json())

app.get('/products', (req: e.Request, res: e.Response) => {
  let filteredItems = [...items];
  const filterCategory = req.query.category ?? '';

  if (filterCategory) {
    filteredItems = filteredItems.filter((item) => item.category === filterCategory)
  }

  res.status(200).json(filteredItems)
})

app.get('/products/:id', (req: e.Request, res: e.Response) => {
  const id = req.params.id;
  const itemFound = items.find((item) => item.id === Number(id ?? 0))

  if (!id || !itemFound) {
    res.status(404).json({ error: 'Not found' })
    return;
  }

  res.status(200).json(itemFound)
})

app.post('/products', (req: e.Request, res: e.Response) => {
  const { name, price, category } = req.body as { name: string, price: number, category: string }
  const id = Math.max(...items.map((item) => item.id)) + 1;

  const newItem = { name, price, category, id }

  items.push(newItem);

  res.status(201).json(newItem)
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
})


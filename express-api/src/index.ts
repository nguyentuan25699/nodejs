import type e = require("express");
const productsRouter = require('./routes/products.route')
const express = require('express')
const app = express();
const PORT = 3000;

app.use((req: e.Request, res: e.Response, next: e.NextFunction) => {
  const startTime = Date.now();

  console.log(`Start request: ${req.method} ${req.url} - ${startTime}`);

  res.on('finish', () => {
    console.log(`${req.method} ${res.statusCode} - ${req.url} ${(Date.now() - startTime)}ms`);

  });

  next();
})
app.use(express.json())

// Router 
app.use('/products', productsRouter)

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
})


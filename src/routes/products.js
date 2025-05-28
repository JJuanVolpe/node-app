import express from 'express';
const router = express.Router();

// Simulación de productos
const products = [{ id: 1, name: "Laptop" }, { id: 2, name: "Mouse" }];

router.get('/products', (req, res) => {
  res.status(200).json(products);
});

export default router;

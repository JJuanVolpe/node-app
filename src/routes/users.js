import express from 'express';
const router = express.Router();

// Simulación de usuarios en memoria
const users = [{ id: 1, name: "Juan" }, { id: 2, name: "Ana" }];

router.get('/users', (req, res) => {
  res.status(200).json(users);
});

export default router;

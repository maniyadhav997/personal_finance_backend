const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// Get all transactions
router.get('/', async (req, res) => {
  const transactions = await Transaction.find().sort({ date: -1 });
  res.json(transactions);
});

// Add transaction
router.post('/', async (req, res) => {
  const { amount, description, date } = req.body;
  try {
    const transaction = new Transaction({ amount, description, date });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: 'Invalid data' });
  }
});

// Delete transaction
router.delete('/:id', async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// Edit transaction
router.put('/:id', async (req, res) => {
  const { amount, description, date } = req.body;
  const updated = await Transaction.findByIdAndUpdate(
    req.params.id,
    { amount, description, date },
    { new: true }
  );
  res.json(updated);
});

module.exports = router;

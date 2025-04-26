const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('✅ MongoDB connected successfully'))
.catch((error) => console.error('❌ MongoDB connection error:', error));;

app.use(cors());
app.use(express.json());

const transactionsRoute = require('./routes/transactions');
app.use('/api/transactions', transactionsRoute);

module.exports = app;

const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const invoiceRoutes = require('./routes/invoice');

app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/invoices', invoiceRoutes);

module.exports = app;

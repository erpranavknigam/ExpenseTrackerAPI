const express = require('express');
const userroutes = require('./routes/userroutes');
const app = express();

app.use(express.json());
// Corrected route definition
app.use('/api/v1/auth', userroutes);

module.exports = app;

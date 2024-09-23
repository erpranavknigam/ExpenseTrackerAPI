const express = require('express');
const userroutes = require('./routes/userroutes');
const exproutes = require('./routes/expenseroutes')
const app = express();

app.use(express.json());
// Corrected route definition
app.use('/api/v1/auth', userroutes);
app.use('/api/v1/expense', exproutes);

module.exports = app;

require('dotenv').config();
const express = require('express');

const router = require('../routes');
// const { AppError } = require('../errors/AppError');

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
  response.send();
});

app.use(router);

// app.use((err, _req, res, _next) => {
//   if (err instanceof AppError) {
//     const { message, httpStatusCode } = err;
//     return res.status(httpStatusCode).json({ message });
//   }
//   return res.status(500).json({ message: `Internal server error - ${err.message}` });
// });

module.exports = app;
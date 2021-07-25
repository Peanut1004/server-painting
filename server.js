const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json'); // <== Will be created later
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3200; // <== You can change the port

server.use(middlewares);
server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running');
});

// jwt
require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const port = 3333;

// Import routes
const indexUser = require('./routes/index');

// Kết nối data base
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(function () {
    console.log('Successfully connected to the database');
  })
  .catch(function (err) {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
  });

// Gửi yêu cầu phân tích kiểu nội dung application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// Gửi yêu cầu phân tích kiểu nội dung application/json
app.use(bodyParser.json());

// Route middlewares
app.use('/api/user', indexUser);

// Lắng nghe các requests
app.listen(port, function () {
  console.log('Server listening port', +port);
});

console.log('123');

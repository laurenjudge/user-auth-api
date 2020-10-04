const http = require('http');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect('mongodb://localhost:27017/node-angular',  {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('Connected to Database');
  })
  .catch((err) => {
    console.log(err)
  });

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


app.use('/users', require('./routes/users'))

const port = 3000;
const hostname = '127.0.0.1';


const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
const express = require('express');
const cors = require('cors');
const api = require('./api');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(api);

app.get('/', (req, res) => {
  res.send({ "message": "hello" });
})

module.exports = app;
/* eslint-disable */
const express = require('express');
const proxy = require('http-proxy-middleware');
const mongoose = require('mongoose');
const app = express();

const apiProxy = proxy('/api', {
  target: 'https://app.asana.com/',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '',
  },
});

app.get('/api/monogo', (req, res) => {
  res.send(mongoose.connection.db.databaseName);
});

app.use('/api', apiProxy);
// connect to Mongo daemon
mongoose
  .connect('mongodb://mongo:27017/SampleDB', { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// DB schema
const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

Item = mongoose.model('item', ItemSchema);

const port = 5000;
app.listen(port);

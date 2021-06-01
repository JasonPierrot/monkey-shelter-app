const apiCallFromRequest = require('./monkeyRequest');
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(express.static(path.resolve(__dirname, './ui/build')));

app.get("/monkeyAPI", function (req, res) {
//   REQUEST
  apiCallFromRequest.callApi(function (response) {
    res.write(JSON.stringify(response));
    res.end();
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './ui/build', 'index.html'));
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join('build', 'index.html'));
  });
}

app.listen(process.env.port || 3001);
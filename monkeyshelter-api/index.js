const apiCallFromRequest = require('./monkeyRequest');
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

const port = process.env.port || 3001

app.use(express.static(path.resolve(__dirname, '../monkeyshelter-ui/build')));

app.use(cors());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.get("/monkeyAPI", function (req, res) {
//   REQUEST
  apiCallFromRequest.callApi(function (response) {
    res.write(JSON.stringify(response));
    res.end();
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../monkeyshelter-ui/build', 'index.html'));
});

app.listen(port, () => {
	console.log(`listening on http://localhost:${port}`)
});
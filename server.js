var express = require('express');
var app = express();
app.use(express.static('public'));

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

//Routes

//HTML Endpoints
app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/view/index.html');
});

//JSON API Endpoints

//server

app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});

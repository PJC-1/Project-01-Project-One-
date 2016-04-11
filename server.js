var express = require('express');
var app = express();
app.use(express.static('public'));

var controllers = require("./controllers");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));


//Routes

//HTML Endpoints
app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/view/index.html');
});

//JSON API Endpoints
app.get('/api', controllers.api.index);
app.get('/api/items', controllers.items.index);
app.get('/api/items/:itemId', controllers.items.show);
app.post('/api/items', controllers.items.create);
app.put('/api/items/:itemId', controllers.items.update);
app.delete('/api/items/:itemId', controllers.items.destroy);
//server

app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});

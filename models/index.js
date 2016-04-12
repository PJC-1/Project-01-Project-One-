var mongoose = require("mongoose");
mongoose.connect( process.env.MONGOLAB_URI ||
                  process.env.MONGOHQ_URL ||
                  "mongodb://localhost/project01");

var Category = require('./category');
module.exports.Category = Category;

var Item = require('./item');
module.exports.Item = Item;

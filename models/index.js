var mongoose = require("mongoose");
mongoose.connect( process.env.MONGOLAB_URI ||
                  process.env.MONGOHQ_URL ||
                  "mongodb://localhost/project01");

module.exports.Category = require("./category.js");
module.exports.Item = require("./item.js");

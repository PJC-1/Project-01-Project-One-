var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Category = require("./category.js");

var ItemSchema = new Schema({
  description: String,
  condition: String,
  importance_level: Number,
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }
});

var Item = mongoose.model('Item', ItemSchema);

module.exports = Item;

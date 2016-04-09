var db = require('../models');




//GET /api/items
function index(req, res) {
  db.Item.find({})
    .populate('category')
    .exec(function(err, items){
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.json(items);
  });
}

//POST /api/items
function create(req, res) {
  var newItem = new db.Item({
    description: req.body.description,
    condition: req.body.condition,
    importance_level: req.body.condition,
  });
  db.Category.findOne({category: req.body.category}, function(err, category){
    if (err) {
      return console.log(err);
    }
    newItem.category = category;
    newItem.save(function(err, oneItem){
      if (err) {
        return console.log("an error on SAVE: " + err);
      }
      console.log("saved, ", oneItem.category);
      res.json(oneItem);
    });
  });
}


// function create(req, res) {
//   console.log("this logs the body, ", req.body);
//   db.Item.create(req.body, function(err, item) {
//     if (err) { console.log('error', err); }
//     console.log("this is the returned item from POST, ", item);
//     res.json(item);
//   });
// }




//export public methods here
module.exports = {
  index: index,
  create: create
};

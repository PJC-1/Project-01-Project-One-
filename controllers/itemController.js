var db = require('../models');

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

function show(req, res) {
  db.Item.findById(req.params.itemId, function(err, foundItem) {
    if(err) { console.log('items controllers show error', err); }
    res.json(foundItem);
  });
}

function destroy(req, res) {
  db.Item.findOneAndRemove({ _id: req.params.itemId }, function(err, foundItem){
    res.json(foundItem);
  });
}

function create(req, res) {
  var newItem = new db.Item({
    description: req.body.description,
    condition: req.body.condition,
    importance_level: req.body.importance_level,
  });
  var categoryAttr = new db.Category({category: req.body.category});
  newItem.category = categoryAttr;
  newItem.save(function(err, oneItem){
    if (err) {
      return console.log("an error on SAVE: " + err);
    }
      res.json(oneItem);
  });
}

function update(req, res) {
  db.Item.findById(req.params.itemId)
    .populate('category')
    .exec(function(err, object){
      object.description = req.body.description;
      object.condition = req.body.condition;
      object.importance_level = req.body.importance_level;
      object.save(function(err, model) {
        res.json(model);
      });
  });
}

module.exports = {
  index: index,
  create: create,
  show: show,
  update: update,
  destroy: destroy
};

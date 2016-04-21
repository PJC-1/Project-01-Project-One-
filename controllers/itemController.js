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

function update(req,res) {
  var itemId = req.params.itemId;
  var catAtt = new db.Category( {category:req.body.category});
  console.log("logging req.body: ", req.body);
  console.log("log of catAtt: ", catAtt);
  catAtt.save(function (err, savedCat) {
    if (err) {
      res.status(500).json({ error: err.message});
    } else {
      db.Item.findById(req.params.itemId, function(err, itemFound) {
        if(err) { console.log('error with findbyId'); }
          console.log("this is loggin inside update, ", itemFound);
          itemFound.description = req.body.description;
          itemFound.condition = req.body.condition;
          itemFound.importance_level = req.body.importance_level;
          console.log("this is after findById, ", itemFound);
          itemFound.category = catAtt;
          itemFound.save(function(err, saved) {
            if(err) {
              console.log('saving item fail');
            } else {
              console.log("this is findByID, ", saved);
              res.status(201).json(saved);
            }
          });
      });
    }
  });
}

module.exports = {
  index: index,
  create: create,
  show: show,
  update: update,
  destroy: destroy
};

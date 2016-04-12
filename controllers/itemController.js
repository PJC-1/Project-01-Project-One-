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


//Get /api/items/:itemId

function show(req, res) {
  db.Item.findById(req.params.itemId, function(err, foundItem) {
    if(err) { console.log('items controllers show error', err); }
    console.log('items controller show sucess', foundItem);
  });
}

//Delete
function destroy(req, res) {
  db.Item.findOneAndRemove({ _id: req.params.itemId }, function(err, foundItem){
    res.json(foundItem);
    console.log('item is deleted from DB,', foundItem);
  });
}


//POST /api/items
// function create(req, res) {
//   var categoryAttr = new db.Item(req.body.category);
//   var newItem = new db.Item({
//     description: req.body.description,
//     condition: req.body.condition,
//     importance_level: req.body.importance_level,
//   });
//   newItem.category = categoryAttr;
//   newItem.save(function(err, oneItem){
//     if (err) {
//       return console.log("an error on SAVE: " + err);
//     }
//       console.log("saved, ", oneItem.category);
//       res.json(oneItem);
//   });
// }

// function create(req, res) {
//   var newItem = new db.Item({
//     description: req.body.description,
//     condition: req.body.condition,
//     importance_level: req.body.importance_level,
//   });
//   var categoryAttr = new db.Category({category: req.body.category});
//   newItem.category = categoryAttr;
//   newItem.save(function(err, oneItem){
//     if (err) {
//       return console.log("an error on SAVE: " + err);
//     }
//       console.log("saved, ", oneItem);
//       res.json(oneItem);
//   });
// }


function create(req, res) {
  // db.Item.findById(req.params.itemId, function(err, foundItem) {
  //   if (foundItem != null){
  //     ///Use the same cattegory
  //   }else{
  //     ///create a new category
  //   }
  // })
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
      console.log("saved, ", oneItem);
      res.json(oneItem);
  });
}





//UPDATE AN ITEM
function update(req, res) {

  // db.Item.findById(req.params.itemId)
  //   .populate('categories').exec(function(err, object){
  //     console.log("this is data once in server: ", object);
  //     object.description = req.body.description;
  //     object.condition = req.body.condition;
  //     object.importance_level = req.body.importance_level;
  //     object.save(function(err, model) {
  //       console.log("logging obj after save: ", model);
  //       res.json(model);
  //     });
  // });

  db.Item.findById(req.params.itemId)
    .populate('category')
    .exec(function(err, object){
      console.log("this is data once in server: ", object);
      object.description = req.body.description;
      object.condition = req.body.condition;
      object.importance_level = req.body.importance_level;
      object.save(function(err, model) {
        console.log("logging obj after save: ", model);
        res.json(model);
      });
  });

//   db.Item.findById(req.params.itemId, function(err, foundItem) {
//     if(err) { console.log('itemsController.update error', err); }
//     console.log('This is the data right after the server: ', foundItem);
//     foundItem.description = req.body.description;
//     foundItem.condition = req.body.condition;
//     foundItem.importance_level = req.body.importance_level;
//     foundItem.save(function(err, saveItem) {
//       if(err) { console.log('saving updated item FAIL'); }
//       db.Item.findById(req.params.itemId, function(err, findItem) {
//         var categoryAT = {category: req.body.category};
//         findItem.category = categoryAT;
//         console.log("This is the updated item after cat is added, ", findItem);
//         foundItem.category = findItem;
//         foundItem.save(function(err, saved) {
//           if(err) { console.log('saved, ', saved); }
//           res.json(saved);
//         });
//       });
//     });
//   });
}


//export public methods here
module.exports = {
  index: index,
  create: create,
  show: show,
  update: update,
  destroy: destroy
};

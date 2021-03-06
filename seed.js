var db = require("./models");

var itemList = [];
itemList.push({
             description: 'cool hat',
             condition: 'fare',
             importance_level: 3,
             category: 'Bedroom'
            });
itemList.push({
            description: 'flower pot',
            condition: 'broken',
            importance_level: 1,
            category: 'Living-Room'
            });
itemList.push({
            description: 'Frying-Pan',
            condition: 'Like New',
            importance_level: 5,
            category: 'Kitchen'
            });
itemList.push({
            description: 'Golf-Clubs',
            condition: 'Used',
            importance_level: 1,
            category: 'Miscellaneous'
            });


var categoryList = [];
categoryList.push({
            category: 'Bedroom'
            });
categoryList.push({
            category: 'Living-Room'
            });
categoryList.push({
            category: 'Kitchen'
            });
categoryList.push({
            category: 'Miscellaneous'
            });



db.Category.remove({}, function(err, categories) {
  db.Category.create(categoryList, function(err, categories){
    if (err) {
      console.log(err);
      return;
    }
    db.Item.remove({}, function(err, items){
      itemList.forEach(function (itemData) {
        var anItem = new db.Item({
          description: itemData.description,
          condition: itemData.condition,
          importance_level: itemData.importance_level
        });
        db.Category.findOne({category: itemData.category}, function (err, foundCategory) {
          if (err) {
            console.log(err);
            return;
          }
          anItem.category = foundCategory;
          anItem.save(function(err, savedItem){
            if (err) {
              return console.log(err);
            }
          });
        });
      });
    });
  });
});

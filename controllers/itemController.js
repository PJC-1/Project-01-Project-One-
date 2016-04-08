var db = require('../models');




//GET /api/items
function index(req, res) {
  db.Item.find({}, function(err, data){
    res.json(data);
  });
}

//export public methods here
module.exports = {
  index: index
};

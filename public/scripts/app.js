console.log("Sanity Check: JS is working!");

var sampleItems = [];
sampleItems.push({
             description: 'cool hat',
             condition: 'fare',
             importance_level: 3,
             category: 'Bedroom'
           });
sampleItems.push({
            description: 'flower pot',
            condition: 'broken',
            importance_level: 1,
            category: 'Living-Room'
            });



$(document).ready(function() {
  console.log("app.js loaded!");
  sampleItems.forEach(function(item) {
    renderItem(item);
  });


});
//End of Doc-Ready

function renderItem(item) {
  console.log('rendering item', item);
  var itemHtml = $('#item-template').html();
  var itemsTemplate = Handlebars.compile(itemHtml);
  var html = itemsTemplate(item);
  $('#items').prepend(html);
}

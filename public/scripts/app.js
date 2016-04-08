console.log("Sanity Check: JS is working!");





$(document).ready(function() {
  console.log("app.js loaded!");

  // sampleItems.forEach(function(item) {
  //   renderItem(item);
  // });

  $.get('api/items').success(function (items){
    items.forEach(function(item) {
      renderItem(item);
    });
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

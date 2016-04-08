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

  $('#item-form form').on('submit', function(e) {
    e.preventDefault();
    var formData = $(this).serialize();
    console.log('formData', formData);
    $(this).trigger("reset");
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

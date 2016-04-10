console.log("Sanity Check: JS is working!");

$(document).ready(function() {
  console.log("app.js loaded!");




  //DISPLAY ITEMS
  $.get('api/items').success(function (items){
    items.forEach(function(item) {
      renderItem(item);
    });
  });
  //END DISPLAY ITEMS


  //SUBMIT NEW ITEM
  $('#item-form form').on('submit', function(e) {
    e.preventDefault();
    var formData = $(this).serialize();
    console.log('formData', formData);
    $.post('/api/items', formData, function(item) {
      console.log('item after POST', item);//YOU SHOULD TRY TO ADD A RENDER FUNCTION HERE
      renderItem(item);
    });
    $(this).trigger("reset");
  });
  //END OF SUBMIT NEW ITEM

  //EVENT CLICK UPDATE-BUTTON
  $('#items').on('click', '.update-item', function(e) {
    console.log('update-item clicked!');
    var id= $(this).closest('.item').data('item-id');
    console.log('logging id: ',id);
  });
  //END EVENT CLICK UPDATE-BUTTON



});
//End of Doc-Ready





function renderItem(item) {
  console.log('rendering item', item);
  var itemHtml = $('#item-template').html();
  var itemsTemplate = Handlebars.compile(itemHtml);
  var html = itemsTemplate(item);
  $('#items').prepend(html);
}

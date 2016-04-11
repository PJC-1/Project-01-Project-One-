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
    var currentItemId= $(this).closest('.item').data('item-id');
    console.log('logging id: ',currentItemId);
    $('#itemModal').data('item-id', currentItemId);
    $('#itemModal').modal();
  });
  //END EVENT CLICK UPDATE-BUTTON

  //EVENT SAVE-MODAL
  $('#saveModal').on('click', saveModalSuccess);


});
//End of Doc-Ready


function saveModalSuccess(e) {
  e.preventDefault();
  console.log("You have clicked the save changes button!");
  var $modal = $('#itemModal');
  var $description = $modal.find('#description');
  var $condition = $modal.find('#condition');
  var $importance_level = $modal.find('#importance_level');
  var $category = $modal.find('#category');

  // var dataCategory = {category: $category.val()};
  var dataCategory = ({category: $category.val()});
  var dataToPost = {
    description: $description.val(),
    condition: $condition.val(),
    importance_level: $importance_level.val(),
  };

  dataToPost.category = dataCategory;
  var itemId = $modal.data('itemId');
  console.log("This is category: ", dataToPost);
  var itemUrl = '/api/items/' + itemId;
  $.ajax({
    method: 'PUT',
    url: itemUrl,
    data: dataToPost,
    success: updateSuccess,
    error: updateError
  });

  $description.val('');
  $condition.val('');
  $importance_level.val('');
  $category.val('');
  $modal.modal('hide');


  // $.get('/api/items/'+ itemId, function(data) {
  //   $('[data-item-id=' + itemId + ']').remove();
  // });
}



// });
// $.post('/api/items', dataToPost, function(data) {
//   console.log('received data from post: ', data);
//
  // $description.val('');
  // $condition.val('');
  // $importance_level.val('');
  // $category.val('');
  //
  // $modal.modal('hide');
  // console.log('gotta wait, ', data);

//UPDATE SUCCESS/ERROR
function updateSuccess(data){
  console.log(data);
  console.log('received data from update:', data);
  var $modal = $('#itemModal');
  var itemId = $modal.data('itemId');
  $.get('/api/items/'+ itemId, function(data) {
    console.log("this is the data ", data);
    $('[data-item-id=' + itemId + ']').remove();
    renderItem(data);
  });


}

function updateError(){
  console.log("error");

}


function renderItem(item) {
  console.log('rendering item', item);
  var itemHtml = $('#item-template').html();
  var itemsTemplate = Handlebars.compile(itemHtml);
  var html = itemsTemplate(item);
  $('#items').prepend(html);
}

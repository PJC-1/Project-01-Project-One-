$(document).ready(function() {

  $.get('api/items').success(function (items){
    items.forEach(function(item) {
      renderItem(item);
    });
  });

  $('#item-form form').on('submit', function(e) {
    e.preventDefault();
    var formData = $(this).serialize();
    $.post('/api/items', formData, function(item) {
      renderItem(item);
    });
    $(this).trigger("reset");
  });


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
  $('#items').on('click', '.delete-item', deleteItemClick);

  // $('#saveModal').on('click', function(e) {
  //   e.preventDefault();
  //   var formData = $('formModal').serialize();
  //   console.log('formData', formData);
  //   var $modal = $('#itemModal');
  //   var itemId = $modal.data('itemId');
  //   var itemUrl = '/api/items/' + itemId;
  //   $.ajax({
  //     method: 'PUT',
  //     url: itemUrl,
  //     data: formData,
  //     success: updateSuccess,
  //     error: updateError
  //   });
  //
  //   $modal.modal('hide');
  //   $(this).trigger("reset");
  // });

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

  var dataCategory = {category: $category.val()};
  // var dataCategory = $category.val();
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

}




//UPDATE SUCCESS/ERROR
function updateSuccess(data){
  console.log(data);
  console.log('received data from update:', data);
  var itemId = data._id;
  console.log("this is the data ", data);
  $('div[data-item-id=' + itemId + ']').remove();
  renderItem(data);
}

function updateError(){
  console.log("error");

}

function deleteItemClick(e) {
  var itemId = $(this).parents('.item').data('item-id');
  console.log('delete item: ', itemId);
  $.ajax({
    url: '/api/items/' + itemId,
    method: 'DELETE',
    success: deleteSuccess
  });
}

function deleteSuccess(data) {
  var deletedItemId = data._id;
  console.log('removing item from the page: ', deletedItemId);
  $('div[data-item-id=' + deletedItemId + ']').remove();
}

function renderItem(item) {
  console.log('rendering item', item);
  var itemHtml = $('#item-template').html();
  var itemsTemplate = Handlebars.compile(itemHtml);
  var html = itemsTemplate(item);
  $('#items').prepend(html);
}

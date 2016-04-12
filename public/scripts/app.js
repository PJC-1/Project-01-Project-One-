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

  $('#items').on('click', '.update-item', function(e) {
    var currentItemId= $(this).closest('.item').data('item-id');
    $('#itemModal').data('item-id', currentItemId);
    $('#itemModal').modal();
  });

  $('#saveModal').on('click', saveModalSuccess);

  $('#items').on('click', '.delete-item', deleteItemClick);

});

function saveModalSuccess(e) {
  e.preventDefault();
  var $modal = $('#itemModal');
  var $description = $modal.find('#description');
  var $condition = $modal.find('#condition');
  var $importance_level = $modal.find('#importance_level');
  var $category = $modal.find('#category');
  var dataCategory = {category: $category.val()};
  var dataToPost = {
    description: $description.val(),
    condition: $condition.val(),
    importance_level: $importance_level.val(),
  };
  dataToPost.category = dataCategory;
  var itemId = $modal.data('itemId');
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

function updateSuccess(data){
  var itemId = data._id;
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

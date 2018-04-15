//Review Constructor
function Review(data){
  this.id = data.id
  this.title = data.title
  this.content = data.content
  this.rating = data.rating
  this.book_id = data.book.id
  this.book_title = data.book.title
  this.name = data.name
}

//Review Show Prototype
Review.prototype.showReview = function(){
  reviewHTML = `<h2>${this.title}</h2>
  <p>Content: ${this.content}</p>
  <p>Rating: ${this.rating}</p>
  <p>Written By: ${this.name}</p>
  <hr>
  <a href="/books/${this.book_id}">Return to ${this.book_title}</a>`
  return reviewHTML
}

//Submit New Review Via Ajax
$(function (){
  $(document).on('submit', '#new_review', function(e){
    e.preventDefault();
    const formPostUrl = $(this).attr("action")
    const formData = $(this).serialize();
    $.ajax({
      url: formPostUrl,
      method: 'post',
      data: formData,
      success: function(data) {
        resetFormFields();
        const newReview = new Review(data);
        const showNewReview = newReview.showReview();
        $("div#reviewResult").append(showNewReview)
      },
      error: function(response) {
        $('div#reviewErrors').html("Sorry, there was an error. Please try again.")
      }
    });
  });
})

//Reset All Form Fields
function resetFormFields(){
  $('#name').val("");
  $('#title').val("");
  $('#content').val("");
  $('#rating').val("");
  $('#new_review input:submit').prop('disabled',false);
}

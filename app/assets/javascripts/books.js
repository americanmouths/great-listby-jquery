$(document).ready(function(){
  bookIndex();
})

//Book Constructor
function Book(data){
  this.id = data.id
  this.title = data.title
  this.genre = data.genre
  this.author = data.author
}

//Genre Index Prototype
Book.prototype.indexTemplate = function(){
  let bookHTML = `<span class="glyphicon glyphicon-chevron-right"></span><a href="books/${this.id}" class="book_index">${ this.title }</a>
  <ul><a href="#" data-id="${this.id}" class="see_book_info" id="books-${this.id}">See More Info</a></ul>`
  return bookHTML
}

//Get Req to Genres
function bookIndex(){
  $.getJSON("/books").done(function(data){
    appendBookIndex(data)
  })
}

//Fire Ajax when Genre Link clicked in Nav Bar
$(document).on('turbolinks:load', function() {
  $('a.books-index-link').on('click', function(e){
    e.stopPropagation()
      $.getJSON("/books").done(function(data){
        appendBookIndex(data)
    })
  })
})

//Append Genre Index to Page
function appendBookIndex(data){
  data.forEach(function(bookData){
    let newBook = new Book(bookData)
    let newBookHTML = newBook.indexTemplate()
    $("#books_index").append(newBookHTML)
  })
}

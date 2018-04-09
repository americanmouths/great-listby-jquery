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

//Book Index Prototype
Book.prototype.indexTemplate = function(){
  let bookHTML = `<a href="#" data-id="${this.id}" class="see_book_info" id="books-${this.id}"><span class="glyphicon glyphicon-chevron-right"></span></a><a href="books/${this.id}" class="book_index">${ this.title }</a>
  <div id="books-${this.id}"></div><br>`
  return bookHTML
}

//Get Req to Books
function bookIndex(){
  $.getJSON("/books").done(function(data){
    appendBookIndex(data)
  })
}

//Fire Ajax when Book Link clicked in Nav Bar
$(document).on('turbolinks:load', function() {
  $('a.books-index-link').on('click', function(e){
    e.stopPropagation()
      $.getJSON("/books").done(function(data){
        appendBookIndex(data)
    })
  })
})

//Append Book Index to Page
function appendBookIndex(data){
  data.forEach(function(bookData){
    let newBook = new Book(bookData)
    let newBookHTML = newBook.indexTemplate()
    $("#books_index").append(newBookHTML)
  })
}

//Show Template
Book.prototype.showTemplate = function() {
  let bookHTML = `Written By: <u>${ this.author }</u><br>
  Genre: <u>${ this.genre}</u>`
  return authorHTML
}

function displayBooks(){
  $(document).on('click', '.see_book_info', function(e){
    e.preventDefault();
    let id = $(this).attr('data-id')
    $.getJSON(`/books/${id}.json`, appendBooks)
  })
}

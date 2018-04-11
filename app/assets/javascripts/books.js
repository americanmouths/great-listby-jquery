$(document).ready(function(){
  bookIndex();
  displayBooks();
});

//Book Constructor
function Book(data){
  this.id = data.id
  this.title = data.title
  this.genre = data.genre.name
  this.author = data.author.name
}

//Book Index Prototype
Book.prototype.indexTemplate = function(){
  let bookHTML = `<div><a href="#" data-id="${this.id}" class="see_book_info" id="books-${this.id}"><span class="glyphicon glyphicon-chevron-right"></span></a>
    <a href="books/${this.id}" class="book-index">${ this.title }</a></div>
  <br><div id="book-info-${this.id}" class="book-info-on-index"></div><br>`
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
  let bookHTML = `<strong>Written By:</strong> <a href="/authors/${this.id}">${ this.author }</a><br>
  <strong>Genre:</strong> <a href="/genres/${this.id}">${ this.genre}</a>`
  return bookHTML
}

//Display books when > is clicked
function displayBooks(){
  $(document).on('click', '.see_book_info', function(e){
    e.preventDefault();
    let id = $(this).attr('data-id')
    $.getJSON(`/books/${id}.json`, appendBooks)
  })
}

function appendBooks(bookData){
  let id = bookData.id
  let newBook = new Book(bookData)
  let newBookHTML = newBook.showTemplate()
  $('#book-info-' + id).append(newBookHTML)
}

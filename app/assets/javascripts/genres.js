$(document).ready(function(){
  genreIndex();
  displayGenreBooks();
})

//Genre Constructor
function Genre(data){
  this.id = data.id
  this.name = data.name
  this.books = data.books
}

//Genre Index Prototype
Genre.prototype.indexTemplate = function(){
  let genreHTML = `<div><a href="#" data-id="${this.id}" class="see_genre_info" id="genres-${this.id}"><span class="glyphicon glyphicon-chevron-right"></span></a>
    <a href="genres/${this.id}" data-id="${this.id}" class="genre-index">${ this.name }</a></div>
  <div id="genre_books-${this.id}"></div>
  <br><div id="genre-book-info-${this.id}" class="book-info-on-index"></div>`
  return genreHTML
}

//Genre Show Books Prototype
Genre.prototype.showBookTemplate = function(){
  let id = this.id
  let bookIntroHTML = `Books:<br>`
  $("#book-info-" + id).append(bookIntroHTML)
  this.books.forEach(function(book){
    let bookId = book.id
    let bookHTML = `<ul><li><a href="/books/${bookId}">${book.title}</li></ul>`
    $("#genre-book-info-" + id).append(bookHTML)
  })
}

//Get Req to Genres
function genreIndex(){
  $.getJSON("/genres").done(function(data){
    appendGenreIndex(data)
  })
}

//Fire Ajax when Genre Link clicked in Nav Bar
$(document).on('turbolinks:load', function() {
  $('a.genres-index-link').on('click', function(e){
    e.stopPropagation()
      $.getJSON("/genres").done(function(data){
        appendGenreIndex(data)
    })
  })
})

//Append Genre Index to Page
function appendGenreIndex(data){
  data.forEach(function(genre){
    let newGenre = new Genre(genre)
    let genreHTML = newGenre.indexTemplate()
    $("#genres_container").append(genreHTML)
  })
}

//Display books when < is clicked
function displayGenreBooks(){
  $(document).on('click', '.see_genre_info', function(e){
    e.preventDefault();
    let id = $(this).attr('data-id')
    $.getJSON(`/genres/${id}.json`, appendGenreBooks)
  })
}

//Render books by Genre
function appendGenreBooks(data){
  let newGenre = new Genre(data)
  newGenre.showBookTemplate()
}

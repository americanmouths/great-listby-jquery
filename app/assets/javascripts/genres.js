$(document).ready(function(){
  genreIndex();
  displayGenreBooks();
  nextGenre();
})


//////////////Genre Object Constructor & Prototypes//////////////
//Genre Constructor
function Genre(data){
  this.id = data.id
  this.name = data.name
  this.books = data.books
}

//Genre Index Prototype
Genre.prototype.indexTemplate = function(){
  let genreHTML = `<div><a href="#" data-id="${this.id}" class="see_genre_info" id="genres-${this.id}"><span class="glyphicon glyphicon-chevron-right" id="${this.id}"></span></a>
    <a href="genres/${this.id}" data-id="${this.id}" class="genre-index">${ this.name }</a></div>
  <div id="genre_books-${this.id}"></div>
  <br><div id="genre-book-info-${this.id}" class="book-info-on-index"></div>`
  return genreHTML
}

//Genre Show Books Prototype (via index)
Genre.prototype.showBookTemplate = function(){
  let id = this.id
  let bookIntroHTML = `Books:<br>`
  $("#genre-book-info-" + id).append(bookIntroHTML)
  this.books.forEach(function(book){
    let bookId = book.id
    let bookHTML = `<ul><li><a href="/books/${bookId}">${book.title}</li></ul>`
    $("#genre-book-info-" + id).append(bookHTML)
  })
  $('span#' + id + '.glyphicon.glyphicon-chevron-right').hide()
  $("#genres-" + id).hide()
}

//Genre Show Template via Next Genre Link
Genre.prototype.showTemplate = function(){
  let genreName = `${this.name}`
  $("#genreName").append(genreName)
  let genreBooks = `<h3><u>Books in this genre:</u></h3>`
  $('#genreBookTitle').append(genreBooks)
  this.books.forEach(function(book){
    let bookId = book.id
    let bookHTML = `<ul><li><center><p><u><a href="/books/${bookId}">${book.title}</u></a></p></li>`
    $('#genreBooks').append(bookHTML)
  })
}

//////////////Genre Index via AJAX//////////////
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


//////////////Genre Show via AJAX & Next Genre//////////////

//clear DIVS on show page
function clearGenreDivs(){
  document.getElementById("htmlGenreName").innerHTML = ""
  document.getElementById("genreName").innerHTML = ""
  document.getElementById("htmlGenreBooks").innerHTML = ""
  document.getElementById("genreBooks").innerHTML = ""
  document.getElementById("genreBookTitleHTML").innerHTML = ""
  document.getElementById("genreBookTitle").innerHTML = ""
}

//Show Page via AJAX
$(document).on('turbolinks:load', function() {
  $('a.genre-index').on('click', function(e){
    e.stopPropagation()
    let id = $(this).attr('data-id')
      $.getJSON("/genres/" + id).done(function(data){
        clearGenreDivs();
        appendGenreShow(data)
    })
  })
})

//Append Author & Books to Show Page
function appendGenreShow(data){
  let newGenre = new Genre(data)
  newGenre.showTemplate();
}

//When the next button has no author to render
function noNextGenre(){
  $('#js-next-genre').hide();
  $('#genreShow').hide();
  const html = "<p>Sorry there is no next genre</p>"
  $("#genreError").append(html)
}


//Next Genre Via AJAX
function nextGenre(){
  $(document).on('click', '#js-next-genre', function(e){
    e.preventDefault();
    clearGenreDivs();
    let nextId = parseInt($("#js-next-genre").attr("data-id")) + 1;
    const url = "/genres/" + nextId + ".json"
    $.ajax({
      url: url,
      method: 'get',
      success: function(data){
        if (data != null){
          appendGenreShow(data)
          $("#js-next-genre").attr("data-id", data["id"]);
        } else {
          noNextGenre();
        }
      }
    })
  })
}

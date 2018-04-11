$(document).ready(function(){
  authorsIndex();
  displayAuthorBooks();
})

//////////////Constructors & Prototypes//////////////

//Author Constructor
function Author(data){
  this.id = data.id
  this.name = data.name
  this.books = data.books
}

//Author Index Prototype
Author.prototype.indexTemplate = function() {
  let authorHTML = `<div><a href="#" data-id="${this.id}" class="see_author_info" id="authors-${this.id}"><span class="glyphicon glyphicon-chevron-right"></span></a>
    <a href="/authors/${this.id}" data-id="${this.id}" class="author-index">${ this.name }</a></div>
  </a>
  <br><div id="author-info-${this.id}" class="author-info-on-index"></div><br>`
  return authorHTML
}

//Author Show Prototype
Author.prototype.showBookTemplate = function(){
  let id = this.id
  let bookIntroHTML = `Books:<br>`
  $("#author-info-" + id).append(bookIntroHTML)
  this.books.forEach(function(book){
    let bookId = book.id
    let bookHTML = `<ul><li><a href="/books/${bookId}">${book.title}</li></ul>`
    $("#author-info-" + id).append(bookHTML)
  })
}


//////////////Author Index via AJAX//////////////

//Append Author Name to Index
function appendAuthorIndex(data){
  data.forEach(function(author){
    let newAuthor = new Author(author)
    let authorHTML = newAuthor.indexTemplate()
    $("#authors_container").append(authorHTML)
  })
}

//Author Index
function authorsIndex(){
  $.getJSON("/authors").done(function(data){
    appendAuthorIndex(data)
    })
  }

//Author Index via LINK in NAV bar
$(document).on('turbolinks:load', function() {
  $('a.authors-index-link').on('click', function(e){
    e.stopPropagation()
      $.getJSON("/authors").done(function(data){
        appendAuthorIndex(data)
    })
  })
})

//Display books when < is clicked
function displayAuthorBooks(){
  $(document).on('click', 'a.see_author_info', function(e){
    e.preventDefault();
    let id = $(this).attr('data-id')
    $.getJSON(`/authors/${id}.json`, appendAuthorBooks)
  })
}

function appendAuthorBooks(data){
  let newAuthor = new Author(data)
  newAuthor.showBookTemplate()
}

$(document).ready(function(){
  authorsIndex();
  displayAuthorBooks();
  nextAuthor();
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
  let authorHTML = `<div><a href="#" data-id="${this.id}" class="see_author_info" id="authors-${this.id}"><span class="glyphicon glyphicon-chevron-right" id="${this.id}"></span></a>
    <a href="/authors/${this.id}" data-id="${this.id}" class="author-index">${ this.name }</a></div>
  <br><div id="author-info-${this.id}" class="author-info-on-index"></div>
  <div id="chevron"></div>`
  return authorHTML
}

//Author Books on Index Prototype
Author.prototype.showBookTemplate = function(){
  let id = this.id
  let bookIntroHTML = `Books:<br>`
  $("#author-info-" + id).append(bookIntroHTML)
  this.books.forEach(function(book){
    let bookId = book.id
    let bookHTML = `<ul><li><a href="/books/${bookId}">${book.title}</li></ul>`
    $("#author-info-" + id).append(bookHTML)
  })
  $('span#' + id + '.glyphicon.glyphicon-chevron-right').hide()
  $("#authors-" + id).hide()
}


//Author Show Template for Author Show page
Author.prototype.showTemplate = function() {
  let authorHTML = `<u>${ this.name }</u>`
  $("#authorName").append(authorHTML)
  this.books.forEach(function(book){
    let id = this.id
    let bookId = book.id
    let bookHTML = `<p><a href="/books/${bookId}">${book.title}</a></p>`
    $("#authors_books").append(bookHTML)
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


//////////////Author Show via AJAX//////////////

//clear DIVS on show page
function clearAuthorDivs(){
  document.getElementById("htmlAuthorName").innerHTML = ""
  document.getElementById("authorName").innerHTML = ""
  document.getElementById("htmlAuthorBooks").innerHTML = ""
  document.getElementById("authors_books").innerHTML = ""
}

//Show Page via AJAX
$(document).on('turbolinks:load', function() {
  $('a.author-show').on('click', function(e){
    e.stopPropagation()
    let id = $(this).attr('data-id')
      $.getJSON("/authors/" + id).done(function(data){
        clearAuthorDivs();
        appendAuthorShow(data)
    })
  })
})

//Append Author & Books to Show Page
function appendAuthorsShow(data){
  let newAuthor = new Author(data)
  newAuthor.showTemplate();
}

//Next Author Via AJAX
function nextAuthor(){
  $(document).on('click', '#js-next', function(e){
    e.preventDefault();
    clearAuthorDivs();
    let nextId = parseInt($("#js-next").attr("data-id")) + 1;
    const url = "/authors/" + nextId + ".json"
    $.ajax({
      url: url,
      method: 'get',
      success: function(data){
        appendAuthorsShow(data)
        $("#js-next").attr("data-id", data["id"]);
      },
      error: function(response){
        noNextAuthor();
      }
    })
  })
}

//When the next button has no author to render
function noNextAuthor(){
  $('#js-next').hide();
  $('#authorShow').hide();
  const html = "<p>Sorry there is no next author</p>"
  $("#authorError").append(html)
}

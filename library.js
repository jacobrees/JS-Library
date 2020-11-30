let myLibrary = [];

function Book(title, author, numberOfPages, hasRead) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.hasRead = hasRead;
}

function addBookToLibrary(book) {
  alert("I want to add a book")
  return myLibrary.push(book)
}

function bookCard(book) {
  return `<div>
    <h3>${book.title}</h3>
    <p><span>Written by:</span> ${book.author}</p>
    <p>Number of pages: ${book.numberOfPages}</p>
    <p>${ book.hasRead ? "You have read this book" : "You haven't read this book!"} </p>
  </div>`
}

function displayBooks() {
  let booksList = ""
  myLibrary.forEach( (book) => {
    booksList += bookCard(book);
  });

  const booksContainer = document.getElementById("booksContainer");
  booksContainer.innerHTML = booksList;
}


const bookForm = document.forms["bookForm"];
bookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // title, author, numberOfPages, hasRead
  // if data is valid?
    // book = new Book(title, author, numberOfPages, hasRead)
    // addBookToLibrary(book)

  alert("I am about to add a book");
});

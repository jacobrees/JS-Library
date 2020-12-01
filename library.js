let myLibrary = [];

function Book(title, author, numberOfPages, hasRead) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.hasRead = hasRead;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
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


displayBooks();

const bookForm = document.forms["bookForm"];

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const [title, author, numberOfPages, hasRead] = e.target.elements;
  const book = new Book(title.value, author.value, numberOfPages.value, hasRead.checked);

  addBookToLibrary(book);
  
  const booksContainer = document.getElementById("booksContainer");
  booksContainer.insertAdjacentHTML('beforeend', bookCard(book));

  e.target.reset();
  return false;
});

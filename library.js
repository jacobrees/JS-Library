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

function removeBookFromLibrary(e) {
  let bookIndex = e.target.dataset.bookIndex 
  myLibrary.splice(bookIndex, 1);
  displayBooks()
}

function bookCard(book, bookIndex) {
  return `<div>
    <h3>${book.title}</h3>
    <p><span>Written by:</span> ${book.author}</p>
    <p>Number of pages: ${book.numberOfPages}</p>
    <p>${ book.hasRead ? "You have read this book" : "You haven't read this book!"} </p>
    <button class="remove-btn" data-book-index="${bookIndex}">Remove Book</button>
  </div>`
}

function displayBooks() {
  let booksList = ""
  myLibrary.forEach( (book) => {
    booksList += bookCard(book, bookIndex);
  });

  const booksContainer = document.getElementById("booksContainer");
  booksContainer.innerHTML = booksList;

  const removeBookButtons = document.querySelectorAll('.remove-btn');
  removeBookButtons.forEach ((btn) => { 
    btn.addEventListener('click', removeBookFromLibrary);
  });
}


displayBooks();

const bookForm = document.forms["bookForm"];

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const [title, author, numberOfPages, hasRead] = e.target.elements;
  const book = new Book(title.value, author.value, numberOfPages.value, hasRead.checked);

  addBookToLibrary(book);

  let bookIndex = myLibrary.length - 1;
  const booksContainer = document.getElementById("booksContainer");
  booksContainer.insertAdjacentHTML('beforeend', bookCard(book, bookIndex));

  e.target.reset();

  const removeBookButton = document.querySelector(`button[data-book-index="${bookIndex}"]`);
  removeBookButton.addEventListener('click', removeBookFromLibrary);

  return false;
});


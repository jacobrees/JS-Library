let myLibrary = [];

function Book(title, author, numberOfPages, hasRead) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.hasRead = hasRead;
}

Book.prototype.toggle = function () {
  this.hasRead = !this.hasRead;
}

function visibility(){
  let bookForm = document.forms.bookForm ;
  
    bookForm.classList.remove("hide-form");
    bookForm.classList.add("show-form");
}

document.getElementById("addBook").addEventListener("click", visibility);

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function removeBookFromLibrary(e) {
  let bookIndex = e.target.dataset.bookIndex;
  myLibrary.splice(bookIndex, 1);
  displayBooks();
}

function readBookToggler(e) {
  let bookIndex = e.target.dataset.toggledBookIndex;
  let book = myLibrary[bookIndex];
  book.toggle();
}

function bookCard(book, bookIndex) {
  return `<div>
    <h3>${book.title}</h3>
    <p><span>Written by:</span> ${book.author}</p>
    <p>Number of pages: ${book.numberOfPages}</p>
    <p>Read: 
       <input type="checkbox" name="read" class="toggle-read" ${book.hasRead ? "checked" : ""} data-toggled-book-index="${bookIndex}" >
    </p>
    <button class="remove-btn" data-book-index="${bookIndex}">Remove Book</button>
  </div>`
}

function displayBooks() {
  let booksList = ""
  myLibrary.forEach( (book, bookIndex) => {
    booksList += bookCard(book, bookIndex);
  });

  const booksContainer = document.getElementById("booksContainer");
  booksContainer.innerHTML = booksList;

  const removeBookButtons = document.querySelectorAll('.remove-btn');
  removeBookButtons.forEach ((btn) => { 
    btn.addEventListener('click', removeBookFromLibrary);
  });

  const readTogglers = document.querySelectorAll(`.toggle-read`);
  readTogglers.forEach((btn) => {
    btn.addEventListener('click', readBookToggler);
  });
}


displayBooks();

const bookForm = document.forms["bookForm"];

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const [title, author, numberOfPages, hasRead] = e.target.elements;
  const book = new Book(title.value, author.value, numberOfPages.value, hasRead.checked);

  addBookToLibrary(book);

  displayBooks();

  e.target.reset();

  return false;
});


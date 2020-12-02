const myLibrary = [];

class Book {
  constructor(title, author, numberOfPages, hasRead) {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.hasRead = hasRead;
  }

  toggle() {
    this.hasRead = !this.hasRead;
  }
}

const visibility = (e) => {
  const { bookForm } = document.forms;
  e.target.classList.add('hide-form');
  bookForm.classList.remove('hide-form');
  bookForm.classList.add('show-form');
};

const addBookToLibrary = (book) => {
  myLibrary.push(book);
};

const readBookToggler = (e) => {
  const bookIndex = e.target.dataset.toggledBookIndex;
  const book = myLibrary[bookIndex];
  book.toggle();
};

const bookCard = (book, bookIndex) => `<div>
    <h3>${book.title}</h3>
    <p><span>Written by:</span> ${book.author}</p>
    <p>Number of pages: ${book.numberOfPages}</p>
    <p>Read: 
       <input type="checkbox" name="read" class="toggle-read" ${book.hasRead ? 'checked' : ''} data-toggled-book-index="${bookIndex}" >
    </p>
    <button class="remove-btn" data-book-index="${bookIndex}">Remove Book</button>
  </div>`;

const displayBooks = () => {
  let booksList = '';

  const removeBookFromLibrary = (e) => {
    const { bookIndex } = e.target.dataset;
    myLibrary.splice(bookIndex, 1);
    displayBooks();
  };

  myLibrary.forEach((book, bookIndex) => {
    booksList += bookCard(book, bookIndex);
  });

  const booksContainer = document.getElementById('booksContainer');
  booksContainer.innerHTML = booksList;

  const removeBookButtons = document.querySelectorAll('.remove-btn');
  removeBookButtons.forEach((btn) => {
    btn.addEventListener('click', removeBookFromLibrary);
  });

  const readTogglers = document.querySelectorAll('.toggle-read');
  readTogglers.forEach((btn) => {
    btn.addEventListener('click', readBookToggler);
  });
};

const jsLibrary = () => {
  displayBooks();

  const { bookForm } = document.forms;

  document.getElementById('addBook').addEventListener('click', visibility);

  bookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const [title, author, numberOfPages, hasRead] = e.target.elements;
    const book = new Book(title.value, author.value, numberOfPages.value, hasRead.checked);

    addBookToLibrary(book);

    displayBooks();

    e.target.reset();

    e.target.classList.remove('show-form');
    e.target.classList.add('hide-form');

    const addBook = document.getElementById('addBook');
    addBook.classList.remove('hide-form');
    addBook.classList.add('show-form');

    return false;
  });
};

jsLibrary();

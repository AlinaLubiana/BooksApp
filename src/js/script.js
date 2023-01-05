'use strict';

const select = {
    templateOf: {
      bookTemplate: '#template-book',
    },
    containerOf: {
        bookList: '.books-list',
    },
};

const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
};

let favoriteBooks = [];

function renderBooks(){

    for(let bookData in dataSource.books){
        const generatedHTML = templates.bookTemplate(dataSource.books[bookData]);
        let bookElement = utils.createDOMFromHTML(generatedHTML);
        const bookContainer = document.querySelector(select.containerOf.bookList);
        bookContainer.appendChild(bookElement);
    }
}

function initActions() {

    const bookContainer = document.querySelectorAll('a.book__image');

    for (let i = 0; i < bookContainer.length; i++){
        bookContainer[i].addEventListener('dblclick', function(event){
            event.preventDefault();
            let bookID = bookContainer[i].getAttribute('data-id');
            if (!favoriteBooks.includes(bookID)){
                favoriteBooks.push(bookID);
                bookContainer[i].classList.add('favorite');
            } else {
                favoriteBooks.pop(bookID);
                bookContainer[i].classList.remove('favorite');
            }
            // console.log('obj', bookContainer[i].getAttribute('data-id'));
            // console.log('favoriteBooks', favoriteBooks);
        });
    }
}

renderBooks();
initActions();



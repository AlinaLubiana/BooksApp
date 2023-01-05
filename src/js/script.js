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

function renderBooks(){

    for(let bookData in dataSource.books){
        const generatedHTML = templates.bookTemplate(dataSource.books[bookData]);
        let bookElement = utils.createDOMFromHTML(generatedHTML);

        const bookContainer = document.querySelector(select.containerOf.bookList);
        bookContainer.appendChild(bookElement);
    }
}
renderBooks();
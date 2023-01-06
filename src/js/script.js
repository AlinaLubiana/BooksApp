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
let filtersCheckBox = [];

function renderBooks(){

    for(let bookData in dataSource.books){
        const generatedHTML = templates.bookTemplate(dataSource.books[bookData]);
        let bookElement = utils.createDOMFromHTML(generatedHTML);
        const bookContainer = document.querySelector(select.containerOf.bookList);
        bookContainer.appendChild(bookElement);
    }
}

function initActions() {
    document.querySelector(select.containerOf.bookList).addEventListener("click", function(event) {
        let book = event.target.offsetParent;
        event.preventDefault(); // with dblClick it's doesn't work, Why?
        if(book.classList.contains('book__image')) {        
            book.classList.add('favorite');
            let bookID = book.getAttribute('data-id');
            if (!favoriteBooks.includes(bookID)){
                favoriteBooks.push(bookID);
                book.classList.add('favorite');
            } else {
                favoriteBooks.pop(bookID);
                book.classList.remove('favorite');
            }
        }        
        // console.log('favoriteBooks', favoriteBooks);
    });

    document.querySelector('.filters').addEventListener("click", function(event){

        if(event.target.getAttribute('type') == "checkbox") {
            if(event.target.checked) {
                // console.log('checked');
                filtersCheckBox.push(event.target.getAttribute('value'));
                

            } else{
                filtersCheckBox.splice(filtersCheckBox.indexOf(event.target.getAttribute('value')),1);
                // console.log('unchecked');
            }
            console.log('filters', event.target.getAttribute('value'));
            console.log(event.target);
        }
        console.log('filters', filtersCheckBox);
        // event.preventDefault();
    });

    
}

renderBooks();
initActions();



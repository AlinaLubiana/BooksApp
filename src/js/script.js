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

    for(let bookData  of dataSource.books){
        const generatedHTML = templates.bookTemplate(bookData);
        let bookElement = utils.createDOMFromHTML(generatedHTML);
        // console.log('bookContainer', bookElement.querySelector('.book__rating__fill').style.cssText = "background: linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);");
       
        let ratingContainer = bookElement.querySelector('.book__rating__fill');
        let ratingStyle = '';
        let ratingWidth = bookData.rating * 10;
        if(bookData.rating < 6){
            ratingStyle = "background: linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%); width:" + ratingWidth + "%";
        }
        if(bookData.rating > 6 && bookData.rating <= 8){
            ratingStyle = "background: linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%); width:" + ratingWidth + "%";
        }
        if(bookData.rating > 8 && bookData.rating <= 9){
            ratingStyle = "background: linear-gradient(to bottom, #299a0b 0%, #299a0b 100%); width:" + ratingWidth + "%";
        }
        if(bookData.rating > 9){
            ratingStyle = "background: linear-gradient(to bottom, #ff0084 0%,#ff0084 100%); width:" + ratingWidth + "%";
        }
        ratingContainer.style.cssText = ratingStyle;


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
        filterBooks();
    });
}

function filterBooks(){
    for(let bookData of dataSource.books){
        const generatedHTML = templates.bookTemplate(dataSource.books[bookData]);
        let shouldBeHidden = false;

        for(let f of filtersCheckBox){
            console.log('f', f);
            console.log('book',bookData.details);
            if(!bookData.details[f]){
                shouldBeHidden = true;
                break;
            }
        }
        const bookContainer = document.querySelectorAll('a.book__image');
        for (let i = 0; i < bookContainer.length; i++){
            if(bookContainer[i].getAttribute('data-id') == bookData.id){
                if(shouldBeHidden){
                    bookContainer[i].classList.add('hidden');
                } else{
                    bookContainer[i].classList.remove('hidden');
                }
            }

        // let bookElement = utils.createDOMFromHTML(generatedHTML);
        // const bookContainer = document.querySelector(select.containerOf.bookList);
        // bookContainer.appendChild(bookElement);
        }
    }
}


renderBooks();
initActions();

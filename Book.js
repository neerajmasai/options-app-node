class Book{
    constructor(title, author, published){
        this.title = title;
        this.author = author;
        this.published = published;
    }
    //show book
    show(){
        return `title: ${this.title}, author: ${this.author}, published: ${this.published}`;
    }
}

//will be used to store Book objects
const books = [];

const addBook = (title, author, published) => {
    //add a book by creating an object of Book class
    
    //create a new Book object
    const book = new Book(title, author, published);

    //store in books array
    books.push(book);

    return true;
}

const showAllBooks = () => {
    //displays all books by using Book show method
    if(books.length == 0){
        //no books
        return false;
    }
    else{
        let bookCount = 0;
        books.forEach(element => {
            bookCount++;
            console.log(`\n${bookCount}. ${element.show()}`);
        });
        console.log(`\nShowing (${bookCount}/${bookCount}) records.`);
        return true;
    }
}

//exports
module.exports = {
    addBook,
    showAllBooks
}
 

const readline = require('readline');
const EventEmitter = require('events');

const book = require('./Book');
const { emit } = require('process');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const emitter = new EventEmitter();


//event listeners

//add book
emitter.on("add", ({bookName, authorName, publishedDate}) => {
    console.clear();
    console.log("\n\n-> Please wait..adding new book");
    if(book.addBook(bookName, authorName, publishedDate)){
        //success
        console.log(`-> Book titled '${bookName}' added successfully.`);
        rl.prompt();
    }
});

//show book
emitter.on("show", () => {
    console.clear();
    console.log("\n\n-> Displaying all books:");
    if(!book.showAllBooks()){
        //no books added yet
        console.log("-> Sorry, no books to show. Please add some books first!");
        rl.prompt();
    }
    else{
        rl.prompt();
    }
});

//wrong choice
emitter.on("error", () => {
    console.log("-> Wrong option selected. Please choose a correct option.");
    rl.prompt();
})

//quit
rl.on("close", () => {
    console.log("-> Quitting..");
})

rl.setPrompt("\n\nChoose from the following:\n1. Show Books\n2. Add Books. \n3. Close\n\nEnter Your Choice: ");
rl.prompt();
rl.on("line", (ans) => {
    switch (Number(ans)) {
        case 1:
            //show books
            emitter.emit("show");
            break;
        case 2:
            //add a book
            rl.question("\nWhat is the name of the book?\nYour Answer -> ", (bookName) => {
                rl.question("\nWho is the author of this book?\nYour Answer -> ", (authorName) => {
                    rl.question("\nWhen was the book published?\nYour Answer -> ", (publishedDate) => {
                        //emit add event
                        emitter.emit("add", {bookName, authorName, publishedDate});
                    });
                });
            });
            break;
        case 3:
            //quit
            rl.question("Do you really want to quit? All unsaved data might be lost.(Y/N)", (choice) => {
                choice = choice.toUpperCase();
                switch (choice) {
                    case "Y":
                        //yes, quit
                        rl.close();
                        break;
                    case "N":
                        //no, stay
                        console.clear();
                        rl.prompt();
                        break;
                    default:
                        //wrong choice
                        emitter.emit("error");
                        break;
                }
            });
            break;
        default:
            //wrong choice
            emitter.emit("error");
            break;                
    }
});
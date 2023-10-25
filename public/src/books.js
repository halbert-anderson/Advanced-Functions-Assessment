const { indexOf } = require("../../test/fixtures/authors.fixture");


//========================================================================================
function findAuthorById(authors, id) {
  const foundAuthorObject = authors.find(author=> author.id ===id);
  return foundAuthorObject;
}



//=========================================================================================
//foundTheBookWithId is a helper function o the findBookById
//it returns true if a book matches a given book
const foundTheBookWithId = (book,id)=> book.id ===id;

function findBookById(books, id) {
 let foundBookObject =null;
 for(let bookNum=0;bookNum<books.length;bookNum++){
  const book=books[bookNum];
if(foundTheBookWithId(book,id)) foundBookObject=book;
 }
 return foundBookObject;
}



//==========================================================================================
function partitionBooksByBorrowedStatus(books) {
let allBooksByReturnStatus=[];
const bookIsBorrowed=false;
const bookIsReturned=true;
let borrowedBooks = books.filter(book =>book.borrows.some((borrowInfo,index)=>{if(index===0)
                                                                             {return borrowInfo.returned===bookIsBorrowed}}));
//console.log(borrowedBooks);
allBooksByReturnStatus.push(borrowedBooks);
let returnedBooks = books.filter(book => book.borrows.some((borrowInfo,index)=>{if(index===0){return borrowInfo.returned===bookIsReturned}}));
//console.log(returnedBooks);
allBooksByReturnStatus.push(returnedBooks);;
//console.log(allBooksByReturnStatus)
return allBooksByReturnStatus;
}


//=============================================================================================================================

function getBorrowersForBook(book, accounts) {

//gets, at most, the last ten borrowers of the book
let mostRecentBorrowersOfBook=book.borrows.filter((borrowerInfo,index)=>{if( index<10){
// console.log(`index: ${index} borrowers: ${borrowerInfo}`);
  return true;}});
//console.log(mostRecentBorrowersOfBook);

//maps the  borrowers borrow info with their account info
//also uses spread operator to create new object
let bookBorrowersFullInfo= mostRecentBorrowersOfBook.map(borrowersAccount=>{const userAccount = accounts.find(account=> { if(account.id===borrowersAccount.id){
                                                                                                                                            return account;}})

                                                  const bookBorrowersAcct={...borrowersAccount,...userAccount}
                                                  return bookBorrowersAcct;}

);
//console.log(bookBorrowersFullInfo);
return bookBorrowersFullInfo;

}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};

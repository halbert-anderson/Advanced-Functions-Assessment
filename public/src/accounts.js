function findAccountById(accounts, id) {
  const foundAccount =accounts.find(account=>account.id===id);
  return foundAccount;
}

//================================================================================================
function sortAccountsByLastName(accounts) {
//used sort method
const sortedAccounts = accounts.sort((accountA,accountB)=>(accountA.name.last.toLowerCase()>accountB.name.last.toLowerCase()?1:-1))

return sortedAccounts;
}

//=================================================================================================
function getTotalNumberOfBorrows(account, books) {
//create an array with the number of times the user borrowed each book
const numberOfBorrowsPerBook= books.map(book=>{
       let borrowsPerBook=0;
          for(let borrowNum=0; borrowNum< book.borrows.length; borrowNum++){
                         let borrow=book.borrows[borrowNum]
                           if (borrow.id===account.id){borrowsPerBook+=1}
              //console.log(`borrowsPerBook: ${borrowsPerBook} borrowID ${borrow.id} accountID: ${account.id}`);
                               }
               return borrowsPerBook;
             })
  
const totalBorrowsForAccount =numberOfBorrowsPerBook.reduce((totalBorrows,borrowsForThisBook)=>totalBorrows+borrowsForThisBook);

return totalBorrowsForAccount;
}

//===============================================================================================

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
 //===========borrowed a function, above,  from the books.js section and used it as a helper function
function getBooksPossessedByAccount(account, books, authors) {

const booksByReturnStatus=partitionBooksByBorrowedStatus(books);
const booksThatAreCheckedOut= booksByReturnStatus[0];
//console.log(booksThatAreCheckedOut);
const booksThatAccountPossesses=booksThatAreCheckedOut.filter(checkedBook=>{const firstBorrower=checkedBook.borrows[0];
                                                                           if(firstBorrower.id===account.id){return true;}}

 )
 //console.log(booksThatAccountPossesses);
const fullRecordOfPossessedBooks=booksThatAccountPossesses.map(bookPossessed=>{
                                                                              let authorInfo=authors.find(authored=>{if(authored.id===bookPossessed.authorId){return authored;}});                                                                                                               
                                                                              //console.log(authorInfo);
                                                                              //destructured the authorInfo object
                                                                              const {id ,name }=authorInfo;                                                                             
                                                                              const fullBookRecord=bookPossessed;
                                                                             fullBookRecord["author"]= {id,name};                                                                       
                                                                            return fullBookRecord;}
                                                                                  );
  return fullRecordOfPossessedBooks;                                                                            
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};

function getTotalBooksCount(books) {
  const allBooksAddedUp =books.length;
  return allBooksAddedUp;
}


//================================================================================================
function getTotalAccountsCount(accounts) {
  const allAccountsAddedUpToo= accounts.length;
  return allAccountsAddedUpToo;
}


//================================================================================================
function getBooksBorrowedCount(books) {
  const bookIsBorrowed=false;
  const numberOfAllBorrowedBooks =books.filter(book =>book.borrows.some((borrowInfo,index)=>{if(index===0)
    {return borrowInfo.returned===bookIsBorrowed}})).length;
return numberOfAllBorrowedBooks
}



//===================================================helper functions for the latter functions==============================================

//function to make a new object that has a name and a count of something associated with the object
  const makeANewObject =(name, count=1) =>{
            const newObject={}; 
            newObject["name"] = name;
            newObject["count"]= count;

      return newObject;
                    
    }


//function that gives youthe top five items in an array from high to low
//Input is and array of abjects to be sorted  returns new sorted array.
const getTopFiveObjects = (anObjectsArray) =>{
      anObjectsArray.sort((anObjectA,anObjectB)=> anObjectA.count>anObjectB.count? -1:1)
        //console.log(anObjectsArray);
      const topFiveObjects =[];
      for(let anObjectNum=0; anObjectNum<5;anObjectNum++){             
             topFiveObjects[anObjectNum]=anObjectsArray[anObjectNum];
         //console.log(topFiveObjects);
         }

    return topFiveObjects;
        
  }


//================this was suppose to be a helper function to make the  arrays that were  to be sorted in the next three function
//==============given time I know I could make it work but i've spent entirely to much time on this already
  const makeNameAndCountArray =(numberOfEachArray, name="", count=1) =>{
    if(numberOfEachArray.length===0){
      const newNameAndCountArrayObject =makeANewObject(`${name}`, count);                  
      numberOfEachArray.push(newNameAndCountArrayObject);
      //console.log(`first pass: ${genreObject}  array ${numberInEachBookGenre}` );
    } 
else{
       const alreadyANameAndCountArrayItem= numberOfEachArray.some(numOfEachArrayItem=>numOfEachArrayItem.name===name);
       if(alreadyANameAndCountArrayItem){
               const matchingNumberOfEachObject=numberOfEachArray.find(numOfEachArrayItem=>numOfEachArrayItem.name===name);
               let tempCount = matchingNumberOfEachObject.count;
               //console.log(genreCount)
               tempCount+=count;
               matchingNumberOfEachObject.count+=count;
               // console.log(`already a genre: ${valueOne}` + "array:"+ numberInEachBookGenre ); 
              }
        else{
         const newNameAndCountArrayObject =makeANewObject(`${name}`, count);                  
         numberOfEachArray.push(newNameAndCountArrayObject);
               // console.log(`a new genre: ${genreObject}  array: ${numberInEachBookGenre}` );                          
            }
   }

return numberOfEachArray;


  }

//============================================================================================================================================

 
function getMostCommonGenres(books) {
const numberInEachBookGenre =[];
  for(let bookNum=0;bookNum<books.length;bookNum++){
        const book = books[bookNum];   
        const bookGenre=book.genre;
       //const numberInEachBookGenre=makeNameAndCountArray(tempArray,`${bookGenre}`);
       // console.log(`Book Genre: ${bookGenre}` );
             if(numberInEachBookGenre.length===0){
                    const newGenreObject =makeANewObject(`${bookGenre}`);                  
                    numberInEachBookGenre.push(newGenreObject);
                    //console.log(`first pass: ${genreObject}  array ${numberInEachBookGenre}` );
                  } 
              else{
                     const alreadyAGenre= numberInEachBookGenre.some(bookGenreItem=>bookGenreItem.name===bookGenre);
                     if(alreadyAGenre){
                             const matchingGenreObject=numberInEachBookGenre.find(bookGenreItem=>bookGenreItem.name===bookGenre)
                          
                             matchingGenreObject.count+=1
                           // console.log(`already a genre: ${valueOne}` + "array:"+ numberInEachBookGenre ); 
                            }
                      else{
                        const newGenreObject =makeANewObject(`${bookGenre}`); 
                             numberInEachBookGenre.push(newGenreObject);
                             // console.log(`a new genre: ${genreObject}  array: ${numberInEachBookGenre}` );                          
                          }
                 }
      }
      // console.log(numberInEachBookGenre);
      const topFiveGenres =getTopFiveObjects(numberInEachBookGenre);
      //console.log(topFiveGenres);

  return topFiveGenres;
}

///===============================================================================================================
function getMostPopularBooks(books){
//=================================================================================================
const numberOfEachBookBorrows =[];
   for(let bookNum=0;bookNum<books.length;bookNum++){
          const book = books[bookNum];  
          const bookTitle = book.title; 
          const bookBorrowsCount=book.borrows.length;//current books borrows
          //console.log(`name: ${bookTitle} count: ${bookBorrowsCount}`); 
          const newBookObject=makeANewObject(`${bookTitle}`, bookBorrowsCount);//must input a string literal and a number for this one
          numberOfEachBookBorrows.push(newBookObject);
          //  console.log(`name: ${bookTitle} count: ${bookBorrowsCount}`);     
         }
    const topFiveBookTitles = getTopFiveObjects(numberOfEachBookBorrows);
    
  return topFiveBookTitles;
 
}
             
//================================================================================================================
function getMostPopularAuthors(books, authors) {

  const numberOfBorrowsPerAuthor =[];
  for(let bookNum=0;bookNum<books.length;bookNum++){
       const book = books[bookNum];   
       const bookAuthorId=book.authorId;
       const authorOfBook =authors.find(author => author.id===bookAuthorId)
       const authorFullName = `${authorOfBook.name.first} ${authorOfBook.name.last}`
       const thisBookBorrowsCount=book.borrows.length;//current books borrows
      // numberOfBorrowsPerAuthor=makeNameAndCountArray(numberOfBorrowsPerAuthor,`${authorFullName}`,thisBookBorrowsCount);
      // console.log(`Author FullName: ${authorFullName}` );
           if(numberOfBorrowsPerAuthor.length===0){
                   const newAuthorBorrowsObject =makeANewObject(`${authorFullName}`, thisBookBorrowsCount);                  
                   numberOfBorrowsPerAuthor.push(newAuthorBorrowsObject);
                   //console.log(`first pass: ${genreObject}  array ${numberInEachBookGenre}` );
                 } 
             else{
                    const alreadyAnAuthor= numberOfBorrowsPerAuthor.some(authorBorrowsItem=>authorBorrowsItem.name===authorFullName);
                    if(alreadyAnAuthor){
                            const matchingAuthorObject=numberOfBorrowsPerAuthor.find(authorBorrowsItem=>authorBorrowsItem.name===authorFullName)
                            matchingAuthorObject.count+=thisBookBorrowsCount;
                            // console.log(`already a genre: ${valueOne}` + "array:"+ numberInEachBookGenre ); 
                           }
                     else{
                      const newAuthorBoorowsObject =makeANewObject(`${authorFullName}`, thisBookBorrowsCount);                  
                      numberOfBorrowsPerAuthor.push(newAuthorBoorowsObject);
                            // console.log(`a new genre: ${genreObject}  array: ${numberInEachBookGenre}` );                          
                         }
                }
     }
      //console.log(numberOfBorrowsPerAuthor);
     const topFivePopularAuthors =getTopFiveObjects(numberOfBorrowsPerAuthor);
    //console.log(topFivePopularAuthors);

 return topFivePopularAuthors;




}



module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};

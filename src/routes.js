const { HTTP_METHOD } = require("./enum")
const {
  createBook,
  getBooks,
  getOneBooks,
  updateBook,
  deleteOneBooks
} = require("./booksHandler")


const routes = [
 {
   method: HTTP_METHOD.POST,
   path: '/books',
   handler: createBook,
 },
 {
   method: HTTP_METHOD.GET,
   path: '/books',
   handler: getBooks,
 },
 {
   method: HTTP_METHOD.GET,
   path: '/books/{id}',
   handler: getOneBooks,
 },
 {
   method: HTTP_METHOD.PUT,
   path: '/books/{id}',
   handler: updateBook,
 },
 {
   method: HTTP_METHOD.DELETE,
   path: '/books/{id}',
   handler: deleteOneBooks,
 },
];
 
module.exports = routes;
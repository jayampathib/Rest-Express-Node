var express = require('express');
var booksController = require('../controllers/booksController')

function routes(Book) {
    //Create router object useing express module
    const bookRouter = express.Router();
    const controller = booksController(Book);
    // bookRouter object is connfigured to read '/books' url and return 
    bookRouter.route('/books')
        .post(controller.post)
        .get((req, res) => {
            //const response = { hello: 'This is my first API Get call' };
            Book.find((err, books) => {
                if (err) {
                    return res.send(err);
                }
                const returnBooks= books.map((bk)=>{
                    const newBook = bk.toJSON();
                    newBook.links ={};
                    newBook.links.self = `http://${req.headers.host}/api/books/${bk._id}`;
                    return newBook;
                });
                return res.json(returnBooks);
            });

        });

    // this .use method is a middlewhere . which is called whe url comes with book id
    // else this book sereach method call is repeate in GET, PUT and PATCH all 3 methods
    bookRouter.use('/books/:bookId', (req, res, next) => {
        Book.findById(req.params.bookId, (err, book) => {
            if (err) {
                console.log('Error findById');
                return res.send(err);
            }
            if (book) {
                console.log('Success findById',book);
                req.book = book;
                return next();
            }
            // book is not found
            return res.sendStatus(404);
        });
    });
    bookRouter.route('/books/:bookId')
        .get((req, res) => {
            console.log('Success Get single book',req);
            console.log('Success Get single book',req.book);
            res.json(req.book)
        })
        //const response = { hello: 'This is my first API Get call' };
        //res.json(req.json); // call above middleware
        //})
        .put((req, res) => {
            //Book.findById(req.params.bookId, (err, book) => {
            //if (err) {
            //    return res.send(err);
            //} 
            const { book } = req;// deconstruct feature in ES2015
            console.log(req.body);
            book.title = req.body.title;
            book.genre = req.body.genre;
            book.author = req.body.author;
            book.read = req.body.read;
            req.book.save((err) => {
                if (err) {
                    return res.send(err);
                }
                return res.json(book);
            });
            //});
        })
        .patch((req, res) => {
            const { book } = req;// deconstruct feature in ES2015

            // to STOP update ID changes, delete it from request object
            if (req.body._id) {  // this _id comes with monogo implementation. but lint not may not support
                delete req.body._id;
            }

            Object.entries(req.body).forEach(item => {
                const key = item[0];
                const valu = item[1];
                book[key] = valu;
            });
            req.book.save((err) => {
                if (err) {
                    return res.send(err);
                }
                return res.json(book);
            });
        })
        .delete((req, res) => {
            console.log('Delete start');
            req.book.remove((err) => {
                if (err) {
                    console.log('Delete Error');
                    return res.send(err);
                }
                console.log('DELETE Success  ');
                return res.sendStatus(204);
            });
        });


    bookRouter.route('/bookSearch')
        .get((req, res) => {
            const query = {};
            // read query string object
            if (req.query.genre) {
                query.genre = req.query.genre;
            }
            //const response = { hello: 'This is my first API Get call' };
            Book.find(query, (err, books) => {
                if (err) {
                    return res.send(err);
                }
                return res.json(books);
            });

        });
    return bookRouter;
}

module.exports = routes;
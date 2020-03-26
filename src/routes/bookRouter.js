var express = require('express');

function routes(Book) {
    //Create router object useing express module
    const bookRouter = express.Router();

    // bookRouter object is connfigured to read '/books' url and return 
    bookRouter.route('/books')
        .post((req, res) => {
            console.log(req.body);
            const book = new Book(req.body);
            book.save();
            console.log(book);
            return res.status(201).json(book);
        })
        .get((req, res) => {
            //const response = { hello: 'This is my first API Get call' };
            Book.find((err, books) => {
                if (err) {
                    return res.send(err);
                }
                return res.json(books);
            });

        });

        // this .use method is a middlewhere . which is called whe url comes with book id
        // else this book sereach method call is repeate in GET, PUT and PATCH all 3 methods
        bookRouter.use('/books/:bookId',(req,res,next) => {
            Book.findById(req.params.bookId, (err, book) => {
                if (err) {
                    return res.send(err);
                }
                if(book){
                    req.book =book;
                    return next();
                }
                // book is not found
                return res.sendStatus(404);
            });
        });
    bookRouter.route('/books/:bookId')
        .get((req, res) => res.json(req.json))
            //const response = { hello: 'This is my first API Get call' };
            //res.json(req.json); // call above middleware
        //})
        .put((req,res)=>{
            //Book.findById(req.params.bookId, (err, book) => {
                //if (err) {
                //    return res.send(err);
                //} 
                const {book} =req;// deconstruct feature in ES2015
                console.log(req.body);              
                book.title = req.body.title;
                book.genre =req.body.genre;
                book.author =req.body.author;
                book.read= req.body.read;
                req.book.save((err)=>{
                    if(err){
                        return res.send(err);
                    }
                    return res.json(book);
                });
            //});
        })
        .patch((req,res)=>{
            const {book} =req;// deconstruct feature in ES2015

            // to STOP update ID changes, delete it from request object
            if(req.book._id){  // this _id comes with monogo implementation. but lint not may not support
                delete req.book._id;
            }

            Object.entries(req.body).forEach(item=>{
                const key = item[0];
                const valu = item[1];
                book[key]=valu;
            });
            req.book.save((err)=>{
                if(err){
                    return res.send(err);
                }
                return res.json(book);
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
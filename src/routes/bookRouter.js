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
    bookRouter.route('/books/:bookId')
        .get((req, res) => {
            //const response = { hello: 'This is my first API Get call' };
            Book.findById(req.params.bookId, (err, book) => {
                if (err) {
                    return res.send(err);
                }
                return res.json(book);
            });
        })
        .put((req,res)=>{
            Book.findById(req.params.bookId, (err, book) => {
                if (err) {
                    return res.send(err);
                } 
                console.log(req.body);              
                book.title = req.body.title;
                book.genre =req.body.genre;
                book.author =req.body.author;
                book.read= req.body.read;
                book.save();
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
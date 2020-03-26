var express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


var svrApp = express();

//Connect to Mongo DB
const db = mongoose.connect('mongodb://localhost/bookAPI', { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log("Connection FAil\n" + err));

// get bookModdel object
const Book = require('./models/bookModel');

// these 2 linse required to enable post data
// Order is important. these 2 lines shoud be added before POST Request
svrApp.use(bodyParser.urlencoded({extended:true}));
svrApp.use(bodyParser.json());

var port = process.env.PORT || 3000;
//Create router object useing express module
const bookRouter = express.Router();

// bookRouter object is connfigured to read '/books' url and return 
bookRouter.route('/books')
    .post((req,res)=>{
        console.log(req.body);
        const book = new Book(req.body);
        console.log(book);
        return res.json(book);
    })
    .get((req, res) => {
        //const response = { hello: 'This is my first API Get call' };
        Book.find((err,books)=>{
            if(err){
                return res.send(err);
            }
            return res.json(books);
        });
         
    });
    bookRouter.route('/books/:bookId')
    .get((req, res) => {
        //const response = { hello: 'This is my first API Get call' };
        Book.findById(req.params.bookId,(err,book)=>{
            if(err){
                return res.send(err);
            }
            return res.json(book);
        });
         
    });
    bookRouter.route('/bookSearch')
    .get((req, res) => {
        const query ={};
        // read query string object
        if(req.query.genre){
            query.genre=req.query.genre;
        }
        //const response = { hello: 'This is my first API Get call' };
        Book.find(query,(err,books)=>{
            if(err){
                return res.send(err);
            }
            return res.json(books);
        });
         
    });   
//use above configured route object
svrApp.use('/api', bookRouter);

svrApp.get('/', (req, res) => {
    res.send('Welcome to REST Api...');
});

svrApp.listen(port, () => {
    console.log('Running On Port :' + port);
})


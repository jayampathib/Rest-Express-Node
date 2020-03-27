var port = process.env.PORT || 3000;

var express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');



if (process.env.ENV === 'test') {
    console.log('This is a test');
    const db = mongoose.connect('mongodb://localhost/bookAPI_Test', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('MongoDB Connected'))
        .catch((err) => console.log("Connection FAil\n" + err));
} else {
    //Connect to Mongo DB'
    // 2 parameter object added to remove deprecate warnings
    console.log('This is for real');
    const db = mongoose.connect('mongodb://localhost/bookAPI', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('MongoDB Connected'))
        .catch((err) => console.log("Connection FAil\n" + err));
}

//------ Mongoose Objects --------------
// get bookModdel object
const Book = require('./models/bookModel');

//------ Route Setting Objects----------
// Get BookRouter route setting object
const bookRouter = require('./routes/bookRouter')(Book);

var svrApp = express();

// these 2 linse required to enable post data
// Order is important. these 2 lines shoud be added before POST Request settings in next statement
svrApp.use(bodyParser.urlencoded({ extended: true }));
svrApp.use(bodyParser.json());

//use above configured route object
svrApp.use('/api', bookRouter);

svrApp.get('/', (req, res) => {
    res.send('Welcome to REST Api...');
});


//open server port and listen to incoming request
// this assignment for "app" is done to use this in export and use it in integration testing
svrApp.server = svrApp.listen(port, () => {
    console.log('Running On Port :' + port);
  });
  
// this export is only required for integration test
module.exports = svrApp;

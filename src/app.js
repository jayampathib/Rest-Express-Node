var express = require('express');
var svrApp= express();

var port = process.env.PORT || 3000;
//Create router object useing express module
const bookRouter = express.Router();

// bookRouter object is connfigured to read '/books' url and return 
bookRouter.route('/books')
    .get((req,res)=>{
        const response = {hello :'This is my first API Get call'};
        res.json(response);
    });
//use above configured route object
svrApp.use('/api',bookRouter);

svrApp.get('/',(req,res)=> {
    res.send('Welcome to REST Api...');
});

svrApp.listen(port,()=>{
    console.log('Running On Port :' +port);
})


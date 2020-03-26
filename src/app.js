var express = require('express');
var svrApp= express();
var port = process.env.PORT || 3000;

svrApp.get('/',(req,res)=> {
    res.send('Welcome to REST Api...');
});

svrApp.listen(port,()=>{
    console.log('Running On Port :' +port);
})


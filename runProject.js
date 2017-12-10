var express = require('express');

var app = express();

app.set('port', 7560);

app.get('/',function(req,res){
    res.sendfile('home.html');
});

app.get('/home.html',function(req,res){
    res.sendfile('home.html');
});

app.get('/programming.html',function(req,res){
    res.render('programming');
});

app.get('/music',function(req,res){
    res.render('music');
});

app.get('/photography',function(req,res){
    res.render('photography');
});

app.use(function(req,res){
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

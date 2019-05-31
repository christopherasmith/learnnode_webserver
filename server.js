const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('getCopyright', ()=>{return 'Copyright by Chris Smith ' + new Date().getFullYear()});
app.set('view engine', 'hbs');

app.use((req, res, next)=>{
    var now = new Date().toString();
    var logline = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', logline + '\n', (err)=>{
        if (err) {console.log('Unable to append to server.log.')}
    });
    next();
})
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res)=>{
    res.render('home.hbs',{
        pageTitle: 'Home',
        pageContent: 'Welcome to the home page',
    });
})

app.get('/about', (req, res)=>{
    res.render('about.hbs',{
        pageTitle: 'About',
    });
})

app.get('/bad', (req, res) => {
    res.send({
      errorMessage: 'Unable to handle request'
    });
  });

app.listen(port, ()=>{console.log(`Server listening on TCP ${port}`)});
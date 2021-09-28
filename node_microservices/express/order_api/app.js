var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
const mongoose  = require('mongoose');
const dbconnection = require('./database/connection');
const autoIncrement = require('mongoose-auto-increment');

var app = express();


dbconnection(); 
autoIncrement.initialize(mongoose.connection);



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
app.use('/order', indexRouter);

module.exports = app;

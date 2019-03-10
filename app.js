var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var apiBannerRouter=require('./api/banner');
var apiSearchRouter=require('./api/search');
var apiTuijianRouter=require('./api/tuijian');
var apiHotRouter=require('./api/hot');
var apiShumaRouter=require('./api/shuma');
var apiZhoubianRouter=require('./api/zhoubian');
var apiBaopinRouter=require('./api/baopin');
var apiNavRouter=require('./api/nav');
var apiRegRouter=require('./api/reg');
var apiLogRouter=require('./api/log');
var apiListRouter=require('./api/list');

var app = express();
 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.use('/api/banner',apiBannerRouter);
app.use('/api/search',apiSearchRouter);
app.use('/api/tuijian',apiTuijianRouter);
app.use('/api/hot',apiHotRouter);
app.use('/api/shuma',apiShumaRouter);
app.use('/api/zhoubian',apiZhoubianRouter);
app.use('/api/baopin',apiBaopinRouter);
app.use('/api/nav',apiNavRouter);
app.use('/api/reg',apiRegRouter);
app.use('/api/list',apiListRouter);
app.use('/api/log',apiLogRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

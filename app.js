var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var favicon = require('serve-favicon');



var indexRouter = require('./routes/index');
var ordersRouter = require('./routes/orders');
var searchRouter = require('./routes/search');
var productsRouter = require('./routes/products');
const session = require('express-session');
const MongoStore = require('connect-mongo') (session);
const mongoose = require('mongoose');



var app = express();
app.locals.moment = require('moment');


mongoose.connect('mongodb://localhost/spareparts', {
  useNewUrlParser: true
});

mongoose.Promise = global.Promise;
const db = mongoose.connection;

app.use(
  session({
    store: new MongoStore({mongooseConnection: db}),
    name: 'sid',
    saveUninitialized: false,
    resave: false,
    secret: 'jkjkjhadgdfg//hjdfh%hgd2',
    cookie: {
     maxAge: 1000 * 60 * 60 * 2,
     sameSite: true,
     secure: process.env.NODE_ENV === 'production'
    }
  })
);

app.use(favicon(__dirname + '/public/images/favicon.ico'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/orders', ordersRouter);
app.use('/search', searchRouter);
app.use('/products', productsRouter);



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

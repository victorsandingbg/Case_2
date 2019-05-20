var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var favicon = require('serve-favicon');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users'); 
var luckyRouter = require('./routes/lucky'); 
var ordersRouter = require('./routes/orders');
var searchRouter = require('./routes/search');
var productsRouter = require('./routes/products');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
const session = require('express-session');
const MongoStore = require('connect-mongo') (session);
const mongoose = require('mongoose');
const dashboardRouter = require('./routes/dashboard');


var app = express();

mongoose.connect('mongodb://localhost/jsdb_3', {
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
app.use('/users', usersRouter); //
app.use('/lucky', luckyRouter); //
app.use('/orders', ordersRouter);
app.use('/search', searchRouter);
app.use('/products', productsRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/dashboard', dashboardRouter);


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

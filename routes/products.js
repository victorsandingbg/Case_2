var express = require('express');
var router = express.Router();
var da = require('../data_access/da')

router.get('/', function(req, res, next) {
    da.findProducts(function(err, products) {
      res.render('products', {title:'Products', products_list: products});
    });
  });

router.get('/', function(req, res, next) {
  da.findProducts(function(err, products) {
    res.render('orders/add', {title:'Products', products_list: products});
    });
  });

  module.exports = router;
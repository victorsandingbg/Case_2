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

  router.post('/updateout_price', function(req, res){
    var id = req.query.id;
    var out_price = req.body.out_price;
    console.log(req.body.id, req.body.out_price);
    da.updateout_price(id, out_price, function(err){
        res.redirect('/products');
    });
});

  module.exports = router;
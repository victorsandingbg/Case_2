var express = require('express');
var router = express.Router();
var da = require('../data_access/da')



router.get('/', function(req, res, next) {
  da.findOrders(function(err, order) {
    res.render('orders/orders', {title:'Orders in my list ', order_list: order});
  });
});

router.post('/', function(req, res, next) {
  da.saveOrders(req.body);
  res.send("Saved in database");
});


router.get('/add', function(req, res){
  da.findProducts(function(err, products) {
    res.render('orders/add', {title: 'Place order', products_list: products});
  });
});

router.get('/delete', function(req, res){
  da.deleteOrder(req.query.id, function(err){
    da.findOrders(function(err, order) {
      res.render('orders/orders', {title:'Orders', order_list: order});
    });
  });
});



module.exports = router;
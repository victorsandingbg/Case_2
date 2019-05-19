var express = require('express');
var router = express.Router();
var da = require('../data_access/da')


router.get('/', function(req, res, next) {
  da.findOrders(function(err, order) {
    res.render('orders/orders', {title:'Orders in my list ', order_list: order});
  });
});


router.get('/add', function(req, res){
  res.render('orders/add', {title: 'Place order'});
});

router.post('/', function(req, res, next) {
  da.saveOrdersFromJson(req.body);
  res.send("Saved in database");
});

module.exports = router;
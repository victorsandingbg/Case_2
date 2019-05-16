    
var express = require('express');
var router = express.Router();
var da = require('../data_access/da')


router.get('/', function(req, res, next) {
  da.findOrders(function(err, order) {
    res.render('orders', {title:'Order listing', order_list: order});
  });

});

router.post('/', function(req, res, next) {
  da.saveOrdersFromJson(req.body);
  res.send("Saved in database");
});
module.exports = router;
var express = require('express');
var router = express.Router();
var da = require('../data_access/da');

router.post('/', function(req, res){
    da.search(req.body['search'], function(err, order){
        res.render('orders/orders', {title:'Search Result', order_list: order});
    });
});

module.exports = router;
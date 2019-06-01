var express = require('express');
var router = express.Router();
var da = require('../data_access/da');

router.post('/', function(req, res){
    da.search(req.body['search'], function(err, customers){
        res.render('customers', {title:'Search Result', customers_list: customers});
    });
});

module.exports = router;
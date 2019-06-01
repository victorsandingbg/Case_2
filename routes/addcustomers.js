var express = require('express');
var router = express.Router();
var da = require('../data_access/da')

router.get('/', function(req, res, next) {
    res.render('addcustomers', { title: 'Spareparts Automobile'});
      });


      router.post('/', function(req, res, next) {
        da.saveCustomers(req.body);
        res.redirect('customers');
      });


module.exports = router;
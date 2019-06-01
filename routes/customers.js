var express = require('express');
var router = express.Router();
var da = require('../data_access/da')


router.get('/', function(req, res, next) {
    da.findCustomers(function(err, customers) {
      res.render('customers', {title:'Customers', customers_list: customers});
    });
  });


router.post('/updateemail', function(req, res){
    var id = req.query.id;
    var email = req.body.email;
    console.log(req.body.id, req.body.email);
    da.updateemail(id, email, function(err){
        res.redirect('/customers');
    });
});

router.post('/updatephone', function(req, res){
    var id = req.query.id;
    var phone = req.body.phone;
    console.log(req.body.id, req.body.phone);
    da.updatephone(id, phone, function(err){
        res.redirect('/customers');
    });
});

router.get('/delete', function(req, res){
    da.deleteCustomers(req.query.id, function(err){
        da.findCustomers(function(err, customers) {
            res.render('customers', {title:'Orders in my list', customers_list: customers});
          });
        });
      });




module.exports = router;
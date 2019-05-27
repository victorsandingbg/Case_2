var express = require('express');
var router = express.Router();
var da = require('../data_access/da')


router.get('/', function(req, res, next) {
    da.findCustomers(function(err, customers) {
      res.render('customers', {title:'Orders in my list ', customers_list: customers});
    });
  });

  /*
router.post('/', function(req, res) {
    customersid = req.body['id']
    email = req.body['email'];
    console.log(customersid)
    console.log(email)
    da.updateEmailOnCustomers(customersid, email, function(err){
        res.redirect('customers');
            });
     });
     */

router.post('/updateemail', function(req, res){
    var partid = req.query.partid;
    var email = req.body.email;
    console.log(req.body.partid, req.body.email);
    da.updateemail(partid, email, function(err){
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
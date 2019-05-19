var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    const n = Math.floor(Math.random() * 100 + 1);
    res.render('lucky', {title: 'lucky number', number: n, number_list: ["2",4,6,8,1]});
  });



  module.exports = router;
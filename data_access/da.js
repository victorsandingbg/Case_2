const Orders = require('../models/orders');
const Customers = require('../models/customers');
const Products = require('../models/products');
const mongoose = require('mongoose');



function connect3db() {
    mongoose.connect('mongodb://localhost:27017/spareparts',
        { useNewUrlParser: true });

    console.log("Going");
    mongoose.connection.once('open', function () {
        console.log("Connection to MongoDB made...");
    }).on('error', function (error) {
        console.log("Error connecting to MongoDB. Error:", error);
    });
}

function search(pattern, cb) {
    connect3db();
    console.log(mongoose.connection.readyState);
    Orders.find({$or: [
        {'customer.first_name': {$regex: '.*' + pattern + '.*'}},
        {'customer.last_name': {$regex: '.*' + pattern + '.*'}}
    ]
    }, function(err, order){
        console.log(order);
        cb(err, order);
    });
}

function saveOrders(p) {
    connect3db();
    var p1 = new Orders(p);
    p1.save();
}

function findOrders(cb) {
    connect3db();
    Orders.find(function(err, order) {
        if(err) {
            console.log('Error getting orders' + err);
        }
        cb(err, order);
    });
}

function findProducts(cb) {
   connect3db();
    Products.find(function(err, products){
        if(err) {
            console.log('Error getting products' + err);
        }
        cb(err, products);
    });
}

function deleteOrder(id, cb) {
    connect3db();
    Orders.deleteOne({"_id": id}, function (err, res) {
       if(err) {
           console.log("Error deleting user" + err);
       }
       cb(err);
    });
}

function deleteCustomers(id, cb) {
    connect3db();
    Customers.deleteOne({"_id": id}, function (err, res) {
       if(err) {
           console.log("Error deleting user" + err);
       }
       cb(err);
    });
}

function findOneCustomers(id, cb) {
    connect3db();
    Customers.findOne({"_id": id}, function (err, res) {
       if(err) {
           console.log("Error deleting user" + err);
       }
       cb(err);
    });
}

function findCustomers(cb) {
    connect3db();
     Customers.find(function(err, customers){
         if(err) {
             console.log('Error getting products' + err);
         }
         cb(err, customers);
     });
 }

 function updateemail(partid, email, cb) {
    connect3db();
    console.log(partid, email);
    Customers.updateOne({'_id': partid}, {$set: {'contact.email': email}}, function(err){ 
        cb(err)
    });
 }



module.exports = {
    saveOrders: saveOrders,
    findOrders: findOrders,
    search: search,
    findProducts: findProducts,
    deleteOrder: deleteOrder,
    findCustomers: findCustomers,
    updateemail: updateemail,
    findOneCustomers: findOneCustomers,
    deleteCustomers: deleteCustomers,

   

};
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Create Orders Schema
const OrdersSchema = new Schema({
    order_date: String,
    orderdetails: [{
        product_id: String,
        quantity_ordered: String
        }],
    customer: {
        first_name: String,
        last_name: String,
        address: {
            street_address: String,
            zip_code: String,
            city: String}
    },
    contact: {
        phone: String,
        email: String
        },
    store: {
        store_name: String,
        address: {
            street_address: String,
            zip_code: String,
            city: String}
    },
        employees: [{
            first_name: String,
            last_name: String
        }]

}, {collection: "order"});

//Create model
const Orders = mongoose.model("orders", OrdersSchema);

module.exports = Orders;
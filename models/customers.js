const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Create Orders Schema
const CustomersSchema = new Schema({
        first_name: String,
        last_name: String,
        address: {
            street_address: String,
            zip_code: String,
            city: String},
        contact: {
            phone: String,
            email: String},    

        }, {collection: "customers"});

//Create model
const Customers = mongoose.model("customers", CustomersSchema);



module.exports = Customers;
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Create Products Schema
const ProductsSchema = new Schema({
    products_name: String,
    in_stock: Number,
    critical_low: Number,
    refill_amount: Number,
    in_price: Number,
    out_price: Number,
    description: String,
    manufacturer: {
        manufacturer_name: String,
        address: {
          street_address: String,
          zip_code: String,
          city: String
        },
        contact: {
            first_name: String,
            last_name: String,
            phone: String, 
            email: String
        }},
    supplier: {
        supplier_name: String,
        address: {
            street_address: String,
            zip_code: String,
            city: String
            },
        contact: {
            first_name: String,
            last_name: String,
            phone: String, 
            email: String
            }},
    car: {
        brand: String,
        model: String
    }
    
}, {collection: "products"});

//Create Products
const Products = mongoose.model("products", ProductsSchema);

module.exports = Products
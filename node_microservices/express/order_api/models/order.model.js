const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');
const config = require('../config');


const orderSchema = mongoose.Schema({
        user: {
            type: String,
        },
        products: [],
        state: {
            type: String,
            enum: config.OrderStates,
        },
        price: {
            type: Number, 
        },
        isActive: {
            type: Boolean,
            default: true,
        },
},  {timestamps: true})



orderSchema.plugin(idValidator);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order; 

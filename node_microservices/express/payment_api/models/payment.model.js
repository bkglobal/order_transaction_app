const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');
const config = require('../config');


const paymentSchema = mongoose.Schema({
        user: {
            type: String,
        },
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
        },
        price: {
            type: Number,
        },
        status: {
            type: String,
            enum: ['Paid', 'Unpaid'],
        },
},  {timestamps: true})



paymentSchema.plugin(idValidator);

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment; 

const { OrderStates } = require('../config');
const PaymentModel = require('../models/payment.model');
const Response = require('../validations/response');
class PaymentController {
    
    constructor() {}

    async createPayment(req, res, next) {
        try {
            const status = Math.round(Math.random());
            if(status) {
                const newPayment = new PaymentModel({...req.body});
                await newPayment.save();
                Response.success(res, { message: 'Payment Successfull', data: { newPayment } });
            } else {
                Response.serverError(res, { message: 'Payment Unsuccessfull', data: {} });
            }

            return;
        } catch(error) {
            console.log(error);
            return next(error);
        }
    }
}

module.exports = new PaymentController();
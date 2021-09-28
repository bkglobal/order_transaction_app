const { OrderStates } = require('../config');
const OrderModel = require('../models/order.model');
const Response = require('../validations/response');
const http = require('http');
class OrderController {

    constructor() { }

    async createOrder(req, res, next) {
        try {
            let orderState = OrderStates[0]; // Created
            let paymentPayload = {};
            let { user, price } = req.body;
            const data = new TextEncoder().encode(
                JSON.stringify({
                    user,
                    price,
                })
            )
            const request = http.request({
                hostname: 'localhost',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': data.length
                },
                port: 3002,
                path: '/payment',
                method: 'POST',
            }, result => {
                console.log(`statusCode: ${result.statusCode}`);
                // console.log(result.statusMessage);

                result.on('data', async d => {
                    paymentPayload = JSON.parse(d.toString());
                    if(paymentPayload.status === 500) {
                        orderState = OrderStates[3]; // Cancelled
                    } else {
                        orderState = OrderStates[1]; // Confirmed
                    }

                    const newOrder = new OrderModel({ ...req.body, state: orderState });

                    await newOrder.save();
                })
            })

         

            request.on('error', error => {
                console.error(error)
            })

            request.write(data)
            request.end()

            if(orderState === OrderStates[3]) {
                Response.serverError(res, { message: paymentPayload.message, data: {  } });
            } else {
                Response.success(res, { message: 'Order Placed Successfully', data: {  } });
            }
           
            return;
        } catch (error) {
            return next(error);
        }
    }

    async getAllOrders(req, res, next) {
        try {
            const allOrders = await OrderModel.find({});
            Response.success(res, { message: 'All Orders Found Successfully', data: { allOrders } });
            return;
        } catch (error) {
            return next(error);
        }
    }

}

module.exports = new OrderController();
const baseURL = 'http://localhost:3001';
console.log(baseURL);
const URL = {
    orderList: `${baseURL}/order`,
    addOrder: `${baseURL}/order`,
    orderDetail: `${baseURL}/order/`,
    orderUpdate: `${baseURL}/order/`,
};

export default URL;
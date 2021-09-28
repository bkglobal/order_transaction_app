var express = require('express');
const { createOrder } = require('./controller');
const { check } = require('express-validator');
const { validationError } = require('../validations/validator');

var router = express.Router();

/* GET home page. */
router.get('/', );

router.post('/',
[
    check('user').exists().not().isEmpty().withMessage('Empty Field is not allowed'),
    check('products').exists().not().isEmpty().withMessage('Empty Field is not allowed').isArray().withMessage('Products Should be an array'),
    check('price').exists().not().isEmpty().withMessage('Empty Field is not allowed'),
],
validationError,
createOrder);

module.exports = router;

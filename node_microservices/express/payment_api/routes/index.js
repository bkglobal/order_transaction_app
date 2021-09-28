var express = require('express');
const { createPayment } = require('./controller');
const { check } = require('express-validator');
const { validationError } = require('../validations/validator');

var router = express.Router();

/* GET home page. */
router.get('/', );

router.post('/',
[
    check('user').exists().not().isEmpty().withMessage('Empty Field is not allowed'),
    check('price').exists().not().isEmpty().withMessage('Empty Field is not allowed'),
],
validationError,
createPayment);

module.exports = router;

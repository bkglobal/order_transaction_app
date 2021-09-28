const { validationResult } = require('express-validator');

module.exports.validationError = (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(422).json({status: 422, errors: errors.array() })
    } else {
        next();
    }
}
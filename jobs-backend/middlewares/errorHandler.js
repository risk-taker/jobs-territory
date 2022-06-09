const { DEBUG_MODE } = require('../config');
const { ValidationError } = require('joi')
const CustomErrorHandler = require('../services/customErrorHandler');

const errorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let data = {
        message: 'Internal server error',
        // spread operator
        ...(DEBUG_MODE === 'true' && { originalError: err.message })
    }
    // keyword=instanceof tells this particular error is instance of which class or function;
    // joi gives validatorError class
    if (err instanceof ValidationError) {
        // 422->validation error
        // 400->client bad request
        statusCode = 422;
        data = {
            message: err.message
        }
    }

    if (err instanceof CustomErrorHandler) {
        statusCode = err.status;
        data = {
            message: err.message
        }
    }

    return res.status(statusCode).json(data);
}

module.exports = errorHandler;
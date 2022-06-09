const Joi = require('joi');

const productSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
    like: Joi.array(),
    review: Joi.array(),
    image: Joi.string(),
});

module.exports = productSchema;
const Joi = require('@hapi/joi');


const registerClothSchema = Joi.object().keys({
    ownerName : Joi.string().required(),
    contact : Joi.string().required(),
    price: Joi.number().min(0).required(),
    deposit: Joi.number().min(0).required(),
    deliveryDate: Joi.date().iso().required(),
    clothImages: {
        url: Joi.string().required(),
        filename: Joi.string()
    },
    // clothImages: Joi.string().pattern(/\.(jpg|jpeg|png)$/).required(),
    measurements: Joi.string().required(),

    leg: Joi.number().min(0).required(),
    neck: Joi.number().min(0).required(),
    waist: Joi.number().min(0).required(),
    shoulder: Joi.number().min(0).required(), 
    arm: Joi.number().min(0).required(), 
    chest: Joi.number().min(0).required(), 
    bicep: Joi.number().min(0).required(), 
    wrist: Joi.number().min(0).required(), 
    back: Joi.number().min(0).required(), 
    stomach: Joi.number().min(0).required(), 
    hip: Joi.number().min(0).required(), 
    thigh: Joi.number().min(0).required()
    
    // password: Joi.string().min(8).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),

    // password : Joi.string().password().required(),
});

module.exports = {
    // registerUserSchema,
    // loginUserSchema,
    registerClothSchema
};
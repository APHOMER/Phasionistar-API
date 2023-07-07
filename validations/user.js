const Joi = require('@hapi/joi');

const registerUserSchema = ({
    name : Joi.string().required(),
    email : Joi.string().email().required(),
    phasionName : Joi.string().min(4).required(),
    password: Joi.string().min(8).required(),
    // password: Joi.string().min(8).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),

});

const loginUserSchema = ({
    // name : Joi.string().required(),
    // email : Joi.string().email().required(),
    phasionName : Joi.string().min(4).trim().required(),
    password: Joi.string().min(8).trim().required(),
    // password: Joi.string().min(8).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

// const registerUserSchema = Joi.object().keys({
//     name : Joi.string().required(),
//     email : Joi.string().email().required(),
//     phasionName : Joi.string().required(),
//     password: Joi.string().min(8).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),

//     // password : Joi.string().password().required(),
// });
  


module.exports = {
    registerUserSchema,
    loginUserSchema,
//     registerClothSchema
};
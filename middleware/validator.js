const Validators = require('../validations');

module.exports = function(validator){
    return async (req, res, next) => {
        try{
            const validated = await Validators[validator].validateAsync(req.body);
            req.body = validated;
            next()
        }catch(error){
            if(error.isJoi){
                console.log(error.message);
                return res.status(422).send({
                    error : error.message
                })
            }
            next(error);
        }
    }
}


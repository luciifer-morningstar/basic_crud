const validator = require('../helpers/validate');

const createUser = (req, res, next) => {
    const validationRule = {
        "first_name": "required|string",
        "last_name": "required|string",
        "email": "required|string"
    }
    
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            return res.status(406)
                .send({
                    success: false,
                    message: 'Errors',
                    data: err
                });
        } else {
            next();
        }
    });
}

module.exports = { 
    createUser
  }
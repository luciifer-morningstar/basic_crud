const validator = require('../helpers/validate');
const users = require('../models/users');

const HomeController = {

    async index (req, res) {
        try{
            let limit = req.query.limit ? parseInt(req.query.limit) : 10;
            let page = req.query.page ? parseInt(req.query.page) : 1;
            let skip = page > 1 ? (page - 1) * limit : 0;
            const data = await users.aggregate([
                {
                    $skip:skip
                },
                {
                    $limit:limit
                }
            ]);
            const totalData = await users.count({});
            return res.status(200).send({ 
                message:"Data retrieved successfully",
                data:{
                    data:data,
                    page:page,
                    limit:limit,
                    totalData:totalData,
                    totalPage:Math.ceil(totalData / limit) > 0 ? Math.ceil(totalData / limit) : 1
                }
            });
        }catch(err){
            return res.send('Error ' + err)
        }
    },

    async store (req, res) {
        let validationRule = {
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
            }
        });
        const { first_name, last_name, email } = req.body;
        let newObject = {}, result = {};
            newObject = {
                first_name: first_name,
                last_name: first_name,
                email: email
            }
            result = await new users(newObject).save();
        try{
            return res.status(200).send({ 
                message:`User stored successfully`,
                data:result
            });
        }catch(err){
        	console.log("Error",err)
            return res.send('Error')
        }
    },

};

module.exports = HomeController;

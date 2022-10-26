const Joi = require('joi')
const { User } = require('../models')
const { v4: uuidv4 } = require('uuid');

const { hashMyPassword } = require('../helpers/helpers')

const createAccount =  (req, res) => {

    const schema = Joi.object({
        lastname: Joi.string().required(),
        othernames: Joi.string().required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string().min(6).required()
    })

    const { error, value } = schema.validate(req.body) 
    try {      
   
            if (error != undefined) {
                throw new Error(error.details[0].message)
            }

        const { lastname, othernames, email, password } = req.body

        User.findOne({
            where: { email: email },
            attributes: ['email']
        })
        .then(result => {
            if (result != null) { 
                throw new Error('Email already exists')
            }
        
        console.log("going to has my password")
         return hashMyPassword(password)
           
        })
        .then(afterHashingResult => {
            
            console.log("got back hshing: ", afterHashingResult)
            return User.create({
              user_id: uuidv4(),
                lastname: lastname,
                othernames: othernames,
                email: email,
                password_hash:  afterHashingResult[0],
                password_salt: afterHashingResult[1]

            })
  
        })
        .then(createUserResult => {
            
            res.status(200).json({
                status: true,
                message: 'Account successfully created'
            })
        })
        .catch(err => {
            res.status(400).json({
                status: true,
                message: err.message
            })
        })

    } catch (error) {
        res.status(400).json({
            status: true,
            message: error.message
        })
    } 
}


module.exports = { createAccount }
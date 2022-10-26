const Joi = require('joi')
const { User } = require('../models')
const { hashMyPassword } = require('../helpers/helpers')
const bcrypt = require('bcrypt')

const Login = (req, res) => {

    const schema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string().required()
    })

    const { error, value } = schema.validate(req.body) 
    try {      
   
        if (error != undefined) {
            throw new Error(error.details[0].message)
        }

        const { email, password } = req.body
        let userData = ''
        User.findOne({ where: { email: email } })
        .then(findUserResult => { 
            if (findUserResult == null) { 
                console.log(`Email :${email} does not exist`)
                throw new Error('Email/Password is incorrect')
            }
             userData = findUserResult
             const { password_hash, password_salt } = findUserResult
            // const hashPasswordFromUserPassword = hashMyPassword(password, password_salt)
            // if (hashPasswordFromUserPassword[0] != password_hash) {
            //     throw new Error('Email/Password is incorrect')
            // }
            console.log(password, password_hash)
            return bcrypt.compare(password, password_hash)
            
        })
        .then(compareResult => {
            console.log(compareResult)
            if (compareResult === false) {
                console.log(`From here: Email :${email} does not exist`)
                throw new Error('Email/Password is incorrect')
            }
            delete userData['password_hash']
            delete userData['password_salt']

            res.status(200).json({
                status: true,
                message: 'Login successful',
                data: userData
            })
        })
         .catch(err => {
            console.log("here: ,", err)
            res.status(400).json({
                status: false,
                message: err.message
        })
         })
        
            
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message
        })
    } 
}


const socialLogin = (req, res) => {
    
}

module.exports = { Login }
const express = require('express')
const router = express.Router()
const { Login } = require('../controllers/loginControllers')

router.post('/login', Login)
 

module.exports = router
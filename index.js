const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000
const signupRoute = require('./routes/signup')
const loginRoute = require('./routes/login')


app.use(bodyParser.json())
app.use(signupRoute)
app.use(loginRoute)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
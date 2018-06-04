require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const controllers = require('./controllers')
const authenticate = require('./middlewares/auth')

// App
const app = express()

// Middlewares
app.use(bodyParser.json())
app.use('/convert', authenticate)

// Routes
app.get('/', controllers.home.index)
app.post('/convert', controllers.convert.index)

// Error handling
app.use(function (err, req, res, next) {
	var statusCode = 500
  res.status(statusCode).json({
  	status: statusCode,
  	message: err.message || err
  });
})

// Server
app.listen(process.env.PORT, () => {
	console.log('HTML to PDF app listening on port ' + process.env.PORT)
})



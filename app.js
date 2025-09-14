// app.js
const fs = require('fs').promises
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const api = require('./api')
const middleware = require('./middleware')

// Set the port
const port = process.env.PORT || 3000
// Boot the app
const app = express()

app.use(middleware.cors)
app.use(bodyParser.json())

// Register the public directory
app.use(express.static(__dirname + '/public'));

// register the routes
app.get('/products', api.listProducts)
app.get('/', api.handleRoot);
app.post('/products', api.createProduct)
app.put('/products/:id', api.updateProduct)
app.delete('/products/:id', api.deleteProduct)
app.get('/products/:id', api.getProduct)

// Boot the server
app.listen(port, () => console.log(`Server listening on port ${port}`))
const express = require('express')
const path = require('path')
const mysql = require('mysql')
const bodyParser = require('body-parser');

const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const routes = require('./controllers/landing')
const register = require('./controllers/register')

app.use('/', routes)
app.use('/', register)

//middlewears
app.use('/css', express.static(__dirname + '/css'))
app.use('/images', express.static(__dirname + '/images'))


const port = process.env.PORT || 5050

app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`)
}) 

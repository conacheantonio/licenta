const express = require('express')
const path = require('path')
const app = express()

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'landing.html'))
}) 

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'))
}) 

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'))
}) 

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'register.html'))
}) 

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contact.html'))
}) 

app.get('/forgot_password', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'forgot_password.html'))
}) 

//middlewears
app.use('/css', express.static(__dirname + '/css'))
app.use('/images', express.static(__dirname + '/images'))

const port = 5050
app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`)
}) 
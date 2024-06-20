const express = require('express')
const path = require('path')
const mysql = require('mysql')
const bodyParser = require('body-parser');
const expressSession = require('express-session')
const app = express() 

app.use(bodyParser.urlencoded({extended: false}))  //accepts a simple key-pair value
app.use(bodyParser.json())
app.use(expressSession({
    secret: 'topsecret',
    resave:'false',
    saveUninitialized: true
}))

const routes = require('./controllers/landing')
const register = require('./controllers/register')
const login = require('./controllers/login')
const reset = require('./controllers/forgot_password')

//const customer = require('./controllers/customer')

// Middleware function to check if the user is authenticated
function requireLogin(req, res, next) {
    if (req.session && (req.session.admin || req.session.customer)) {
        // User is logged in, proceed to the next middleware or route handler
        next();
    } else {
        // User is not logged in, redirect to the login page
        res.redirect('/login');
    }
}

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log("Session ended.")
            res.redirect('/login'); // Redirect to the login page after logout
        }
    });
});

// Apply the requireLogin middleware to all routes starting with /customer/ or /admin/
app.use(['/customer/*', '/admin/*'], requireLogin);

app.use('/', routes)
app.use('/', register)
app.use('/', login)
app.use('/', reset)

//app.use('/', customer)

//middlewears
app.use('/css', express.static(__dirname + '/css'))
app.use('/images', express.static(__dirname + '/images'))

const port = process.env.PORT || 5050

app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`)
}) 

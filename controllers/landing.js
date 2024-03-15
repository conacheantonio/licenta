const express = require('express')
const path = require('path')
const router = express.Router()

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'landing.html'));
});

router.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'about.html'));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'login.html'));
});

router.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'contact.html'));
});

router.get('/forgot_password', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'forgot_password.html'));
});

module.exports = router;
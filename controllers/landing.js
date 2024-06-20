const express = require('express')
const path = require('path')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const router = express.Router()

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'landing.html'));
});

router.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'about.html'));
});

router.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'contact.html'));
});

module.exports = router;
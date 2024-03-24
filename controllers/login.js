const express = require('express')
const path = require('path')
const router = express.Router()
const asyncValidator = require('async-validator-2')
const validationRules = require('../rules/validationRules')
const userModel = require('../models/userModel')

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'login.html'));
});

router.post('/userlogin', (req, res) => {

    var data = {
        email: req.body.email,
        password: req.body.password
    }

    var rules = validationRules.users.login
    var validator = new asyncValidator(rules)

    validator.validate(data, (errors, fields) => {
        if(!errors){
            userModel.validateUser(req.body.email, req.body.password, function(result) {
                if(!result){
                    console.log("Invalid email or password");
                    res.status(400).json({ success: false, message: 'Invalid email or password' });
                } else {
                    console.log("User logged in successfully:", result);
                    req.session.customer = result.id
                    console.log("Session after login:", req.session);
                    res.json({ success: true, redirect: '/customer/home' });
                }
            })
        } else {
            console.log("Validation errors:", fields);
            res.status(400).json({ success: false, errors: errors });
        }
    })
})

router.post('/adminlogin', (req, res) => {

    var data = {
        email: req.body.admin_email,
        password: req.body.admin_password
    }

    var rules = validationRules.users.login
    var validator = new asyncValidator(rules)

    validator.validate(data, (errors, fields) => {
        if(!errors){
            userModel.validateUser(req.body.admin_email, req.body.admin_password, function(result) {
                if(!result){
                    res.status(400).json({ success: false, message: 'Invalid email or password' });
                } else {
                    console.log(result)
                    if(result.is_admin == 1){
                        req.session.admin = result.id
                        res.json({ success: true, redirect: '/admin/home' });
                    } else {
                        res.status(403).json({ success: false, message: 'You are not authorized to access this page' });
                    }
                }
            })
        } else {
            console.log(fields)
            res.status(400).json({ success: false, errors: errors });
        }
    })
})

module.exports = router
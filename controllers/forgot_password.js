const express = require('express')
const path = require('path')
const router = express.Router()
const asyncValidator = require('async-validator-2')
const validationRules = require('../rules/validationRules')
const userModel = require('../models/userModel')

router.get('/forgot_password', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'forgot_password.html'));
});

router.post('/forgot_password', (req, res) => {

    var data = {
        email: req.body.email,
        phone: req.body.phone,
        pin: req.body.pin,
        newPassword: req.body.newPassword
    }

    var rules = validationRules.users.forgotPassword // Define validation rules for forgot password form
    var validator = new asyncValidator(rules)

    validator.validate(data, (errors, fields) => {
        if (!errors) {
            userModel.getUserByEmailPhoneAndPin(req.body.email, req.body.phone, req.body.pin, function(user) {
                if (user) {
                    userModel.updatePassword(req.body.email, req.body.newPassword, function(result) {
                    res.status(200).json({ success: true, message: 'Password reset successfully' });
                    });
                } else {
                    res.status(400).json({ success: false, message: 'Incorrect email, phone, or PIN. No account found..' });
                }
            });
        } else {
            console.log("Validation errors:", fields);
            res.status(400).json({ success: false, errors: errors });
        }
    });
});

module.exports = router
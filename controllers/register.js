var express = require('express')
var router = express.Router()
var path = require("path");
var asyncValidator = require('async-validator-2')
const validationRules = require('../rules/validationRules');
var userModel = require.main.require('./models/userModel')

router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'register.html'));
});

router.post('/register', (req, res) => {

    var data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        phone: req.body.phone,
        pin: req.body.pin,
        termsAndConditions: req.body.termsAndConditions 
    };

    var rules = validationRules.users.create;
    var validator = new asyncValidator(rules);

    userModel.validateRegister(data, function(duplicateExists) {
        if (duplicateExists) {
            console.log('Email or phone already exists')
            return res.status(400).json({ success: false, errors: [{ message: 'Email or phone number already exists' }] });
        } else {
            if (data.password !== data.confirmPassword) {
                console.log('Passwords do not match')
                return res.status(400).json({ success: false, errors: [{ message: 'Passwords do not match', field: 'confirmPassword' }] });
            }

            validator.validate(data, (errors, fields) => {
                if (!errors) {
                    userModel.createUser(data, function(result) {
                        if (result) {
                            console.log(result);
                            res.json({ success: true }); // Send success response
                        } else {
                            res.json({ success: false, errors: [{ message: 'Invalid data' }] }); // Send error response
                        }
                    });
                } else {
                    console.log(fields);
                    res.status(400).json({ success: false, errors: errors }); // Send error response
                }
            });
        }
    });
});

module.exports = router;
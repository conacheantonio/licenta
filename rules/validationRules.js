const customValidators = {
    termsAndConditions: {
        validate(value, data){
            return value === 'checked'
        }
    }
}

module.exports = {
    users: {
        create: {
            name: {
                required: true,
                message: 'Name cannot be empty'
            },
            email: {
                required: true,
                type: 'email',
                message: 'Invalid email'
            },
            password: {
                required: true,
                min: 4,
                message: 'Invalid Password'
            },
            phone: {
                required: true,
                len: 10,
                message: 'Invalid Phone'
            },
            pin:{
                required: true,
                len: 4,
                message: 'Incorrect pin format'
            },
            termsAndConditions: {
                required: true,
                termsAndConditions: true,
                message: 'Please agree to the terms and conditions'
            }
        },
        login: {
            email: {
                required: true,
                type: 'email',
                message: 'Invalid email'
            },
            password: {
                required: true,
                message: 'Password cannot be empty'
            }
        }   
    }
}
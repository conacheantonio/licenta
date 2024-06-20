var db = require.main.require('./models/config')

var validateRegister = (user, callback) => {
    var sql = "SELECT * FROM registration_list WHERE email = ? OR phone = ?"
    db.executeQuery(sql, [user.email, user.phone], function(result) {
        // Check if any rows are returned
        if(result && result.length > 0) {
            // Email or phone already exists
            callback(true); // Return true if duplicate found
        } else {
            // No duplicate found
            callback(false); // Return false if no duplicate found
        }
    })
}

var createUser = (user, callback) => {
    var sql = "INSERT INTO registration_list (name, email, password, phone, pin) VALUES (?, ?, ?, ?, ?)"
    db.executeQuery(sql, [user.name, user.email, user.password, user.phone, user.pin], function(result) {
      callback(result);  
    })
}

var validateUser = (email, password, callback) => {
    var sql = "SELECT * FROM registration_list WHERE email = ? AND password = ?"
    db.executeQuery(sql, [email, password], function(result) {
        callback(result[0])
    })
}
var getUserByEmailPhoneAndPin = (email, phone, pin, callback) => {
    var sql = "SELECT * FROM registration_list WHERE email = ? AND phone = ? AND pin = ?";
    db.executeQuery(sql, [email, phone, pin], function(result) {
        callback(result[0]);
    });
};

var updatePassword = (email, newPassword, callback) => {
    var sql = "UPDATE registration_list SET password = ? WHERE email = ?";
    db.executeQuery(sql, [newPassword, email], function(result) {
        callback(result);
    });
};

module.exports = {
    validateRegister,
    createUser,
    validateUser,
    getUserByEmailPhoneAndPin,
    updatePassword
}
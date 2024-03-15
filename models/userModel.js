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
    var sql = "INSERT INTO registration_list (name, email, password, phone) VALUES (?, ?, ?, ?)"
    db.executeQuery(sql, [user.name, user.email, user.password, user.phone], function(result) {
      callback(result);  
    })
}

module.exports = {
    validateRegister,
    createUser
}
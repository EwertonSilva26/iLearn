const bcrypt = require('bcrypt');
const res = require('express/lib/response');

module.exports = {
    encryptPassword(password) {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                return hash;
            });
        });
    },
    decryptPassword(password, hash) {
       return bcrypt.compareSync(password, hash);
    }
}
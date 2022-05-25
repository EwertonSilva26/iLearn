const dbConnection = require("../config/dbserver");
const connection = dbConnection();

const { login } = require("../model/userModel");

module.exports = {
    loginController: function(app, req, res) {
        login(req.body, connection, function(error, result) {
           if(error) {
               res.send({registed: false, error});
           }
           res.send({registed: true, result})
        })
       
    }
}
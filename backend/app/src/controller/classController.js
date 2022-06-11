const dbConnection = require("../config/dbserver");
const connection = dbConnection();

const { createClass } = require("../model/classModel");

module.exports = {
    createClassController: async function (app, req, res) {
        createClass(req.body, connection, function (error, result) {
            console.log("Response: " + JSON.stringify(req.body))
            // if (req.headers.token === undefined) {
            //     res.status(403).send({
            //         status: 403, error,
            //         message: "Token Invalido!"
            //     });
            // }

            if(error){
                res.status(400).send({ status: 400, error });
            }

            res.status(201).send({ status: 201, result });
        })
    }
}

const dbConnection = require("../config/dbserver");
const connection = dbConnection();

const { 
    createClass, 
    getAllClasses, 
    insertStudentInClass,
    getStudentClasses 
} = require("../model/classModel");

module.exports = {
    createClassController: async function (app, req, res) {
        createClass(req.body, connection, function (error, result) {
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
    },

    getAllClassesController: async function (app, req, res) {
        getAllClasses(req.body, connection, function (error, result) {

            if(error){
                res.status(400).send({ status: 400, error });
            }

            res.status(200).send({ status: 200, result });
        })
    },

    insertStudentInClassesController: async function (app, req, res) {
        insertStudentInClass(req.body, connection, function (error, result) {

            if(error){
                res.status(400).send({ status: 400, error });
            }

            res.status(201).send({ status: 200, result });
        })
    },

    getStudentClassesController: async function (app, req, res) {
        getStudentClasses(req.body, connection, function (error, result) {

            if(error){
                res.status(400).send({ status: 400, error });
            }

            const resp = {

            }

            res.status(201).send({ status: 200, resp });
        })
    }
}

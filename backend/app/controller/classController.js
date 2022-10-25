const dbConnection = require("../config/dbserver");
const connection = dbConnection();

const {
    createClass,
    getAllClasses,
    insertStudentInClass,
    deleteClassModel,
    updateClassNameModel,
    getClassInformationModel
} = require("../model/classModel");

module.exports = {
    createClassController: async function (app, req, res) {
        createClass(req.body, connection, function (error, result) {
            // if (req.headers.token === undefined) {
            //     res.status(403).send({
            //         status: 403, error,
            //         message: "Forbbiden - Token Invalido!"
            //     });
            // }

            if (error) {
                res.status(400).send({ status: 400, error });
            }

            res.status(201).send({ status: 201, result });
        })
    },

    getAllClassesController: async function (app, req, res) {
        console.log("Authorization: ", req.headers.authorization)
        getAllClasses(req, connection, function (error, result) {
            if (error) {
                res.status(400).send({ status: 400, error });
            }

            res.status(200).send({ status: 200, result });
        })
    },

    insertStudentInClassesController: async function (app, req, res) {
        insertStudentInClass(req.body, connection, function (error, result) {
            const classCode = req.body.classCode;
            if (error) {
                res.status(400).send({ status: 400, error });
            }

            res.status(201).send({ status: 200, classCode, result });
        })
    },

    getClassInformationController: async function (app, req, res) {
        getClassInformationModel(req, connection, function (error, result) {
            if (error) {
                res.status(400).send({ status: 400, error });
            }
    
            res.status(200).send({ status: 200, result });
        })
    },

    deleteClassController: async function (app, req, res) {
        deleteClassModel(req, connection, function (error, result) {
            if (error) {
                res.status(400).send({ status: 400, error });
            }

            res.status(204).send({ status: 204, result });
        })
    },

    updateClassNameController: async function (app, req, res) {
        updateClassNameModel(req, connection, function (error, result) {
            if (error) {
                res.status(400).send({ status: 400, error });
            }

            res.status(204).send({ status: 204, result });
        })
    }

}

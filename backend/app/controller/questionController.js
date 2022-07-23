const dbConnection = require("../config/dbserver");
const connection = dbConnection();

const {
    getQuestionsByClassCodeModel,
    getQuestionModel,
    postAnswerModel
} = require("../model/questionModel");

module.exports = {
    getQuestionsByClassCodeController: async function (app, req, res) {
        getQuestionsByClassCodeModel(req, connection, function (error, result) {
            if(error){
                res.status(400).send({ status: 400, error });
            }

            res.status(200).send({ status: 200, result });
        })
    },

    getQuestionController: async function (app, req, res) {
        getQuestionModel(req, connection, function (error, result) {
            if(error){
                res.status(400).send({ status: 400, error });
            }

            console.log("RESULTADO: " + JSON.stringify(result[0]))
            res.status(200).send({ status: 200, result });
        })
    },

    postAnswerController: async function (app, req, res) {
        postAnswerModel(req, connection, function (error, result) {
            if(error){
                res.status(400).send({ status: 400, error });
            }

            res.status(200).send({ status: 200, result });
        })
    }

}
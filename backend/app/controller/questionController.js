const dbConnection = require("../config/dbserver");
const connection = dbConnection();

const {
    getQuestionsByClassCodeModel,
    getQuestionModel,
    postAnswerModel,
    putAnswerModel,
    sendQuestionModel,
    sendFeedbackModel,
    getQuestionsNumberByClassCodeCodeModel
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

            // console.log("RESULTADO: " + JSON.stringify(result[0]))
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
    },

    putAnswerController: async function (app, req, res) {
        putAnswerModel(req, connection, function (error, result) {
            if(error){
                res.status(400).send({ status: 400, error });
            }

            res.status(200).send({ status: 200, result });
        })
    },

    sendQuestionController: async function (app, req, res) {
        sendQuestionModel(req, connection, function (error, result) {
            if(error){
                res.status(400).send({ status: 400, error });
            }

            res.status(201).send({ status: 201, result,
                 message: "Questão cadastrada com sucesso!" });
        })
    },

    sendFeedbackController: async function (app, req, res) {
        sendFeedbackModel(req, connection, function (error, result) {
            if(error){
                res.status(400).send({ status: 400, error });
            }

            res.status(204).send({ status: 204, result,
                 message: "Feedback cadastrada com sucesso!" });
        })
    },

    getQuestionsNumberByClassCodeCodeController: async function (app, req, res) {
        getQuestionsNumberByClassCodeCodeModel(req, connection, function (error, result) {
            if(error){
                res.status(400).send({ status: 400, error });
            }

            res.status(200).send({ status: 200, result,
                 message: "Numero total de questões retornado com sucesso!" });
        })
    }


}
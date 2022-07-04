const dbConnection = require("../config/dbserver");
const connection = dbConnection();

const {
    getQuestionsByClassCodeModel
} = require("../model/questionModel");

module.exports = {
    getQuestionsByClassCodeController: async function (app, req, res) {
        getQuestionsByClassCodeModel(req, connection, function (error, result) {
            if(error){
                res.status(400).send({ status: 400, error });
            }

            res.status(200).send({ status: 200, result });
        })
    }
}
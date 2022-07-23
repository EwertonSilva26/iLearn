const {
    getQuestionsByClassCodeController,
    getQuestionController,
    postAnswerController
} = require("../controller/questionController");

module.exports = {
    getQuestionsByClassCode: function (app) {
    app.get("/questions/:id", (req, res) => {
        try {
            getQuestionsByClassCodeController(app, req, res);
        } catch(error) {
            throw error;
        }
    });
  },

  getQuestion: function (app) {
    app.get("/question/:code/:id/:userId", (req, res) => {
        try {
            getQuestionController(app, req, res);
        } catch(error) {
            throw error;
        }
    });
  },

  postAnswer: function (app) {
    app.post("/answer", (req, res) => {
        try {
            postAnswerController(app, req, res);
        } catch(error) {
            throw error;
        }
    });
  }
}
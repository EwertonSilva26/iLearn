const {
    getQuestionsByClassCodeController
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
  }
}
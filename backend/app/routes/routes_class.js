const {check, validationResult } = require("express-validator");
const { 
  createClassController, 
  getAllClassesController 
} = require("../controller/classController");

// const { verifyJWT } = require("../../utils");

module.exports = {
  createClass: function (app) {
    app.post("/class/create", (req, res) => {
      try{
        createClassController(app, req, res);
      } catch(error) {
        throw error;
      }
    });
  },

  getClasses: function (app) {
    app.get("/classes", (req, res) => {
      getAllClassesController(app, req, res);
    });
  }

};

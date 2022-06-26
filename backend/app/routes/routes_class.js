const {check, validationResult } = require("express-validator");
const { 
  createClassController, 
  getAllClassesController,
  insertStudentInClassesController,
  getStudentClassesController
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
    app.get("/classes/:id", (req, res) => {
      getAllClassesController(app, req, res);
    });
  },

  insertStudentsInClasses: function (app) {
    app.post("/student/classes", (req, res) => {
      insertStudentInClassesController(app, req, res);
    });
  },

  getStudentClasses: function (app) {
    app.get("students/student/classes/search", (req, res) => {
      getStudentClassesController(app, req, res);
    });
  }
  
};

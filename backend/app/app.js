require('dotenv').config();
const app = require("./config/server");
const userRoutes = require("../app/routes/routes_user");
const classRoutes = require("../app/routes/routes_class");
const questionRoutes = require("../app/routes/routes_question");

userRoutes.loginUser(app);
userRoutes.createUser(app);

classRoutes.createClass(app);
classRoutes.getClasses(app);
classRoutes.insertStudentsInClasses(app);
classRoutes.getStudentClasses(app);
classRoutes.getClassInformation(app);

questionRoutes.getQuestionsByClassCode(app);
questionRoutes.getQuestion(app);
questionRoutes.postAnswer(app);
questionRoutes.sendQuestion(app);
questionRoutes.sendFeedback(app);
require('dotenv').config();
const app = require("./config/server");
const userRoutes = require("../app/routes/routes_user");
const classRoutes = require("../app/routes/routes_class");

userRoutes.loginUser(app);
classRoutes.createClass(app);
classRoutes.getClasses(app);
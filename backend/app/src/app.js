require('dotenv').config();
const app = require("./config/server");
const userRoutes = require("../src/routes/routes_user");
const classRoutes = require("../src/routes/routes_class");

userRoutes.loginUser(app);
classRoutes.createClass(app);
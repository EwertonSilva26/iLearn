require('dotenv').config();
const app = require("./config/server");
const userRoutes = require("../src/routes/routes_user");

userRoutes.loginUser(app);
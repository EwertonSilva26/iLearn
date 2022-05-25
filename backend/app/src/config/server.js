const express = require("express");
var cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.listen(PORT, function () {
  console.log(`Servidor rodando com express na porta: ${PORT}.`);
});

module.exports = app;

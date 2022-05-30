const dbConnection = require("../config/dbserver");
const connection = dbConnection();
const auth = require("../config/authentication");
const jwt = require('jsonwebtoken');

const { login, getHash } = require("../model/userModel");

module.exports = {
    loginController: async function (app, req, res) {
        console.log(`[UserController] - Iniciando login: ${req.body.email}`)

        const hash = await getUserHash(req.body.email);
        if (hash == 0) {
            res.status(400).send({ status: 400, message: 'E-mail invalido!' });
            return;
        }

        const isMatch = auth.decryptPassword(req.body.password, hash);
        if (isMatch || (hash != 0)) {
            login(req.body, connection, function (error, result) {
                if (error) {
                    res.status(403).send({ status: 403, registed: false, error });
                }
                let id = result.id_user;
                let token = jwt.sign({ id }, process.env.SECRET, {
                    expiresIn: 300 // expira in 5min
                });
                res.status(200).send({ status: 200, registed: true, token })
            })
        } else {
            throw new Error("Senha incorreta");
        }
    }
}

const getUserHash = async (email) => {
    return await getHash(email, connection);
}
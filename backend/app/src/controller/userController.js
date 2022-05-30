const dbConnection = require("../config/dbserver");
const connection = dbConnection();

const auth = require("../config/authentication");
const { login, getHash } = require("../model/userModel");

module.exports = {
    loginController: async function (app, req, res) {
        console.log(`[UserController] - Iniciando login para: ${req.body.email}`)

        const hash = await getUserHash(req.body.email);
        if(hash == 0) {
            res.status(403).send({status: 403, message: 'E-mail invalido!' });
            return;
        }
        
        const isMatch = auth.decryptPassword(req.body.password, hash);
        if (isMatch ||(hash != 0)) {
            login(req.body, connection, function (error, result) {
                if (error) {
                    res.send({status: 403, registed: false, error });
                }
                res.send({ status: 200, registed: true, result })
            })
        } else {
            throw new Error("Senha incorreta");
        }
    }
}

const getUserHash = async (email) => {
    return await getHash(email, connection);
}
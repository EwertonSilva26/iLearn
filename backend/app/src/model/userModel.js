let sql;


module.exports = {

  //Faz login de usuario
  login: function (body, connection, callback) {
    sql = `select id_user from users where user_email = '${body.email}' and user_pwd = '${body.password}'`;
    connection.query(sql, callback);
  },

  /** Retorna senha hash salva no banco e dados */
  getHash: async function (email, connection) {    
    let value = await checkEmail(email, connection);

    if (value <= 0) { 
      return Promise.resolve(value)
      .then(() => { return 0; }); 
    }

    let hash = new Promise((resolve, reject) => {
      sql = `select user_pwd from users where user_email = '${email}'`;
      connection.query(sql, function (error, result) {
        if (!error) {
          resolve(result[0].user_pwd);
        }
        reject(error);
      });
    })

    return await hash;
  }
}
/** Verifica se e-mail existe no banco de dados */
const checkEmail = async (email, connection) => {
  sql = `select count(*) as value from users where user_email = '${email}'`;

  let value = new Promise((resolve, reject) => {
    connection.query(sql, function (error, result) {
      if (error) {
        reject(error);
      }
      resolve(result[0].value);
    })
  })

  return await value;

}
let sql;


module.exports = {

    login: function (body, connection, callback) {
      sql = `select count(*) from users where user_email = '${body.email}' and user_pwd = '${body.password}'`;
      connection.query(sql, callback);
    }
}
let sql;

module.exports = {

  /** Cria nova turma **/
  createClass: function (body, connection, callback) {
    sql = `insert into tb_class (class_name, class_code) 
    values('${body.className}', '${body.classCode}')`;
    connection.query(sql, callback);
  }
}
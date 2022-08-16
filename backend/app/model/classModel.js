let sql;

module.exports = {

  /** Cria nova turma **/
  createClass: function (body, connection, callback) {
    sql = `call insert_class ('${body.className}', '${body.classCode}', 
    ${body.userId})`;
    connection.query(sql, callback);
  },

  /** Busca todas as turmas **/
  getAllClasses: function (req, connection, callback) {
    console.log("[MODEL] - Buscando todas as turmas")
    
    sql = `CALL get_all_classes(${req.params.id});`;

    connection.query(sql, callback);
  },

    /** Insere aluno em um turma **/
    insertStudentInClass: function (body, connection, callback) {
      console.log(`[MODEL] - Inserindo aluno na turma de código: ${body.classCode}` )
      sql = `CALL insert_student_in_class(${body.idStudent}, '${body.classCode}')`;
      connection.query(sql, callback);
    },

    /** Busca turmas que o aluno esta cadastrado aluno em um turma **/
    // getStudentClasses: function (body, connection, callback) {
    //   console.log("[MODEL] - Buscando turmas onde o aluno esta cadastrado")
    //   sql = `SELECT * FROM tb_student_teacher_class AS stc
    //   LEFT JOIN tb_class AS c
    //   ON c.id_class = stc.id_class
    //   LEFT JOIN tb_student AS s
    //   ON s.id_student = stc.id_student
    //   WHERE stc.id_student = ${body.idStudent}`;
    //   connection.query(sql, callback);
    // }
}
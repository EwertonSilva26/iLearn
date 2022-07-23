let sql;

module.exports = {

  /** Cria nova turma **/
  createClass: function (body, connection, callback) {
    sql = `insert into tb_class (class_name, class_code) 
    values('${body.className}', '${body.classCode}')`;
    connection.query(sql, callback);
  },

  /** Busca todas as turmas **/
  getAllClasses: function (req, connection, callback) {
    console.log("[MODEL] - Buscando todas as turmas")
    
    sql = `SELECT c.class_name, c.class_code 
    FROM tb_student AS s
    INNER JOIN tb_student_class AS sc
    ON sc.id_student = s.id_student
    INNER JOIN tb_class AS c
    ON sc.id_class = c.id_class
    WHERE s.id_student = ${req.params.id};`;

    connection.query(sql, callback);
  },

    /** Insere aluno em um turma **/
    insertStudentInClass: function (body, connection, callback) {
      console.log(`[MODEL] - Inserindo aluno na turma de código: ${body.classCode}` )
      sql = `CALL insert_student_in_class(${body.idStudent}, '${body.classCode}')`;
      connection.query(sql, callback);
    },

    /** Busca turmas que o aluno esta cadastrado aluno em um turma **/
    getStudentClasses: function (body, connection, callback) {
      console.log("[MODEL] - Buscando turmas onde o aluno esta cadastrado")
      sql = `SELECT * FROM tb_student_teacher_class AS stc
      LEFT JOIN tb_class AS c
      ON c.id_class = stc.id_class
      LEFT JOIN tb_student AS s
      ON s.id_student = stc.id_student
      WHERE stc.id_student = ${body.idStudent}`;
      connection.query(sql, callback);
    }
}
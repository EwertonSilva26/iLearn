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
    console.log(`[MODEL] - Inserindo aluno na turma de código: ${body.classCode}`)
    sql = `CALL insert_student_in_class(${body.idStudent}, '${body.classCode}')`;
    connection.query(sql, callback);
  },

  /** Busca todas informações sobre a turma e questões por 
   * id da questão e codigo da turma. **/
  getClassInformationModel: function (req, connection, callback) {
    console.log(`[MODEL] - Buscando todas informações sobre a questão com  
              id da questão: ${req.params.id}, codigo da classe: ${req.params.code}`)

    sql = `SELECT * FROM tb_class_question_answer_student AS tcqas
              INNER JOIN tb_class AS tc
              ON tcqas.id_class = tc.id_class
              INNER JOIN tb_question AS tq
              ON tcqas.id_question = tq.id_question
              INNER JOIN tb_answer AS ta
              ON tcqas.id_answer = ta.id_answer
              INNER JOIN tb_student AS ts
              ON tcqas.id_student = ts.id_student
              WHERE tc.class_code = '${req.params.code}' 
              AND tq.id_question = ${req.params.id} ;`

    connection.query(sql, callback);
  }
}
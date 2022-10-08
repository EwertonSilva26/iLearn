let sql;

function GeneralException(message) {
  this.message = message;
  this.name = "ClasseJaExisteExeception";
}

module.exports = {

  /** Cria nova turma **/
  createClass: async function (body, connection, callback) {

    let number = await verifyIfHasClassName(body.className, connection);

    if (number === 0) {
      sql = `call insert_class ('${body.className}', '${body.classCode}', 
    ${body.userId})`;
    
  } else {
    sql = `SELECT COUNT(*) AS number FROM tb_class WHERE class_name = '${body.className}'`;
  }

  connection.query(sql, callback);
  },

  /** Busca todas as turmas **/
  getAllClasses: function (req, connection, callback) {
    console.log(`[MODEL] - Buscando todas as turmas com userId: ${req.params.id}`)

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

    sql = `SELECT * FROM tb_class_question_answer_student_teacher AS tcqast
              INNER JOIN tb_class AS tc
              ON tcqast.id_class = tc.id_class
              INNER JOIN tb_question AS tq
              ON tcqast.id_question = tq.id_question
              INNER JOIN tb_answer AS ta
              ON tcqast.id_answer = ta.id_answer
              INNER JOIN tb_student AS ts
              ON tcqast.id_student = ts.id_student
              WHERE tc.class_code = '${req.params.code}' 
              AND tq.id_question = ${req.params.id} ;`

    connection.query(sql, callback);
  }

}

/** Retorna se já existe o nome da classe */
async function verifyIfHasClassName(className, connection) {
  console.log(`Contando numero de classes para verificar 
  se classe a ser criada ja existe! - ${className}`);

  let number = new Promise((resolve, reject) => {
    sql = `SELECT COUNT(class_name) AS number FROM tb_class where class_name = '${className}'`

    connection.query(sql, function (error, result) {
      if (!error) {
        resolve(result[0].number);
      }
      reject(error);
    });
  })

  return await number;
}
let sql;

module.exports = {
    /** Busca questoẽs por codigo da turma **/
    getQuestionsByClassCodeModel: function (req, connection, callback) {
        console.log(`[MODEL] - Buscando todas questoẽs da turma ${req.params.id}`)

        sql = `SELECT * FROM tb_class_question_answer_student AS tcqas
        INNER JOIN tb_class AS tc
        ON tcqas.id_class = tc.id_class
        INNER JOIN tb_question AS tq
        ON tcqas.id_question = tq.id_question
        WHERE tc.class_code = '${req.params.id}'`;

        connection.query(sql, callback);
    },

    /** Busca questão por id da questão, codigo da turma e id do usuario**/
    getQuestionModel: function (req, connection, callback) {
        console.log(`[MODEL] - Buscando questão com 
        class code: ${req.params.code}, 
        id da questão: ${req.params.id},
        id do usuario: ${req.params.userId}`)

        sql = `CALL get_Question_Information('${req.params.code}', 
        ${req.params.id}, ${req.params.userId});`

        connection.query(sql, callback);
    },


    /** Insere resposta do aluno**/
    postAnswerModel: function (req, connection, callback) {
        const body = req.body;
        console.log(`[MODEL] - Inserindo resposta: ${JSON.stringify(body)}`)

        sql = `CALL insert_answer('${body.answer}', ${body.userId}, 
            ${body.questionId},'${body.classCode}', '${body.percentage}')`;

        connection.query(sql, callback);
    },

    /** Insere questão **/
    sendQuestionModel: function (req, connection, callback) {
        const body = req.body;
        console.log(`[MODEL] - Inserindo questão: ${JSON.stringify(body)}`)

        sql = `CALL insert_question('${body.title}', '${body.question}', 
                '${body.teacherAnswer}','${body.tip}','${body.classCode}')`;

        connection.query(sql, callback);
    },

    /** Insere feedback a questão **/
    sendFeedbackModel: function (req, connection, callback) {
        const params = req.params;
        console.log(`[MODEL] - Inserindo feedback com 
        id_class = ${params.classId},
        id_question = ${params.questionId},
        id_answer = ${params.answerId},
        id_student = ${params.studentId}`)

        sql = `UPDATE tb_class_question_answer_student 
        SET feedback = '${req.body.feedback}' 
        WHERE id_class_question_answer_student = ${req.body.id} AND
        id_class = ${params.classId} 
        AND id_question = ${params.questionId} 
        AND id_answer = ${params.answerId} 
        AND id_student = ${params.studentId}`;

        setHasFeedback(connection, params.questionId)

        connection.query(sql, callback);

    },

    /** Busca o numero total de questões no banco de dados pelo código da classe. **/
    getQuestionsNumberByClassCodeCodeModel: function (req, connection, callback) {
        console.log(`[MODEL] - Busca o numero total de questões com código da classe:
         ${JSON.stringify(req.params.code)}`)

        sql = `SELECT count(*) AS total FROM tb_class_question_answer_student AS tcqas
        INNER JOIN tb_class AS tc
        ON tcqas.id_class = tc.id_class
        INNER JOIN tb_question AS tq
        ON tcqas.id_question = tq.id_question
        WHERE tc.class_code = '${req.params.code}'`;

        connection.query(sql, callback);
    }
}
// Alterando hasFeedBack coluna na tb_question
function setHasFeedback(connection, questionId) {
    let strSql = `UPDATE tb_question SET hasFeedBack = true WHERE id_question = ${questionId};`

    connection.query(strSql, function (error, result) {
        if (error) {
            console.log(`[MODEL] - Coluna hasFeedBack não alterada para true: 
            ${JSON.stringify(error)}`);
        }

        console.log(`[MODEL] - Coluna hasFeedBack alterada para true: ${JSON.stringify(result)}`);
    });
}
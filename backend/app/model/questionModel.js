let sql;

module.exports = {
    /** Busca questoẽs por codigo da turma **/
    getQuestionsByClassCodeModel: function (req, connection, callback) {
        console.log(`[MODEL] - Buscando questoẽs ${req.params.id}`)

        sql = `SELECT DISTINCT q.id_question, q.title, 
        q.hasFeedback FROM tb_question AS q
        INNER JOIN tb_classe_question AS cq
        ON cq.id_question = q.id_question
        INNER JOIN tb_class AS c
        ON cq.id_class = c.id_class
        INNER JOIN tb_student_class AS sc
        ON c.id_class = sc.id_class
        WHERE c.class_code = '${req.params.id}'`;

        connection.query(sql, callback);
    },
}
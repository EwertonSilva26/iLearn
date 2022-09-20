import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import swal from 'sweetalert';

import lamp from "./lamp.png";
import "./Question.css";

let answer = "";
let countTimes = 0;
const Question = () => {
    const [question, setQuestion] = useState({});
    const [error, setError] = useState("");

    const { id } = useParams();
    const { code } = useParams();

    const obj = {
        questionId: id,
        classCode: code,
        userId: JSON.parse(sessionStorage.getItem('token')).userId
    }

    useEffect(() => {
        countTimes++;
        if (countTimes === 1) {
            axios.get(`http://localhost:3003/question/${obj.questionId}/${obj.classCode}/${obj.userId}`)
                .then((response) => {
                    if (response.data.status === 200) {
                        let result = response.data.result[0];
                        setQuestion(result[0]);
                        setError("");
                    }
                })
                .catch((err) => {
                    console.log(`Erro ao buscar questão ${err}`)
                    setError("Erro ao buscar questão");
                });
        }
    });

    function sendAnswer() {
        if (answer !== "") {
            let result = checkPercentage(answer);
            obj.answer = answer;
            obj.percentage = `${parseFloat(result.toFixed(2))}%`;

            axios
                .post('http://localhost:3003/answer', obj)
                .then((response) => {
                    if (response.data.status === 200) {
                        swal("Resposta enviada!", `Seu algoritimo tem 
                        ${parseFloat(result.toFixed(2))}% de similaridade!`);

                        setError("");
                    }
                    else {
                        throw Error();
                    }
                })
                .catch((err) => {
                    console.log(`Erro ao enviar resposta ${err}`)
                    setError("Erro ao enviar resposta");
                });
        } else {
            swal("Campo vazio", 'Campo resposta não pode estar vazio');

        }
    }

    function setAnswer(event) {
        answer = event.target.value;
    }

    const showTip = () => {
        swal("Dica", `${question.tip}`);
    }

    const seeFeedBack = () => {
        swal("Feedback", `${question.hasFeedBack ?
            question.feedback.toUpperCase() : "Não há feedback para essa questão!"}`);
    }

    const removeString = (list) => {
        for (let c = 0; c < list.length; c++) {
            if (list[c].includes("printf") &&
                (!list[c].includes("%d")) && (!list[c].includes("%i")) &&
                (!list[c].includes("%f")) && (!list[c].includes("%c")) &&
                (!list[c].includes("%s"))) {

                list[c] = 'printf("")';

            } else if (list[c].includes("printf") && (list[c].includes("%d"))) {
                list[c] = 'printf(%d)';
            } else if (list[c].includes("printf") && (list[c].includes("%i"))) {
                list[c] = 'printf(%i)';
            } else if (list[c].includes("printf") && (list[c].includes("%f"))) {
                list[c] = 'printf(%f)';
            } else if (list[c].includes("printf") && (list[c].includes("%c"))) {
                list[c] = 'printf(%c)';
            } else if (list[c].includes("printf") && (list[c].includes("%s"))) {
                list[c] = 'printf(%s)';
            }

        }

        return list;
    }

    const checkPercentage = (answer) => {
        const studentAnswer = removeString(answer
            .replace(/[\r\n]/gm, '').split(";"));

        const teacherAnswer = removeString(question.teacher_answer
            .replace(/[\r\n]/gm, '').split(";"));

        let count = 0;
        for (let d = 0; d < studentAnswer.length; d++) {
            if (studentAnswer[d] === teacherAnswer[d]) {
                count++;
            }
        }

        let result = ((count * 1) / teacherAnswer.length) * 100;

        return result;
    }

    return (
        <div className="main_question_class">
            <div id="div_question">
                <p>{question.question}</p>
            </div>

            <div id="div_tip">
                <button id="btn_tip" onClick={showTip}>
                    <span className="tooltiptext">
                        Clique para ter uma dica.
                    </span>
                    <img src={lamp}></img>
                </button>
            </div>

            <div id="question_container">
                <div id="left_question">
                    {question.student_answer ? (
                        <p id="answer">
                            {question.student_answer}
                            <button id="btn_edit">Editar</button>
                        </p>

                    ) : (

                        <textarea id="txt_id" onKeyUp={(e) => setAnswer(e)}
                            onMouseOut={(e) => setAnswer(e)}
                            placeholder="Escreva seu algoritimo aqui">
                        </textarea>
                    )}

                </div>

                <div id="right_question">

                    <div id="id_feedback">
                        <p id="p_feedback">Clique para ter acesso ao feedback enviado pelo seu professor:</p>
                        <button id="btn_feedback" onClick={seeFeedBack}>Ver Feedback</button>
                    </div>
                    <span style={{ marginLeft: "25px", fontSize: "20px", 
                    fontWeight: "600", color: "cornflowerblue" }}>
                        Sua resposta teve {question.percentage} de similaridade
                    </span>

                    <div id="div_answer">
                        <button id="btn_send_answer" onClick={sendAnswer}>Enviar</button>
                    </div>
                </div>

            </div>
        </div >
    );

};

export default Question;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import swal from 'sweetalert';

import lamp from "./lamp.png";
import "./Question.css";

let answer = "";
const Question = () => {
    const [question, setQuestion] = useState([]);
    const [error, setError] = useState("");

    const {id} = useParams();
    const {code} = useParams();

    const obj = {
        questionId: id,
        classCode: code,
        userId: JSON.parse(localStorage.getItem('token')).userId
    }

    useEffect(() => {
        axios.get(`http://localhost:3003/question/${obj.questionId}/${obj.classCode}/${obj.userId}`)
            .then((response) => {
                if (response.data.status === 200) {
                    const result = response.data.result[0];
                    setQuestion(result[0]);
                    setError("");
                }
            })
            .catch((err) => {
                console.log(`Erro ao buscar questão ${err}`)
                setError("Erro ao buscar questão");
            });
    });

    function sendAnswer() {
        if (answer !== "") {
            obj.answer = answer;

            checkPercentage(answer);

            axios
                .post('http://localhost:3003/answer', obj)
                .then((response) => {
                    if (response.data.status === 200) {
                        swal('Resposta enviada com sucesso');
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
        swal("Dica",`${question.tip}`);
    }

    const seeFeedBack = () => {
        swal("Feedback", `${question.hasFeedBack ?
            question.feedBack : "Não há feedback para essa questão!"}`);
    }

    const checkPercentage = (answer) => {
        const studentAnswer = answer.replaceAll("\n", "").split(" ");
        const teacherAnswer = question.teacher_answer.replaceAll("\n", "").split(" ");
        let count = 0;

        for (let i = 0; i < studentAnswer.length; i++) {
            if (studentAnswer[i] === teacherAnswer[i]) {
                count += 1;
            }
        }
        let result = ((count * 1) / teacherAnswer.length)*100;
        swal("Resposta enviada!", `Seu algoritimo tem ${parseFloat(result.toFixed(2))}% de similaridade!`);
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

                    <div id="div_answer">
                        <button id="btn_send_answer" onClick={sendAnswer}>Enviar</button>
                    </div>
                </div>

            </div>
        </div >
    );

};

export default Question;
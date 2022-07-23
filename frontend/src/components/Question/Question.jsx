import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import swal from 'sweetalert';

import lamp from "./lamp.png";
import "./Question.css";

let count = 0;
let answer = "";
const Question = () => {
    const [question, setQuestion] = useState([]);
    const [error, setError] = useState("");

    const { id } = useParams();
    const { code } = useParams();

    const obj = {
        questionId: id,
        classCode: code,
        userId: JSON.parse(sessionStorage.getItem('token')).userId
    }

    useEffect(() => {
        if (count === 0) {
            count = 1;
            axios.get(`http://localhost:3003/question/${obj.classCode}/${obj.questionId}/${obj.userId}`)
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
        }

    });

    function sendAnswer() {
        if (answer !== "") {
            obj.answer = answer;
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
        }
    }

    function setAnswer(event) {
        answer = event.target.value;
    }

    const showTip = () => {
        swal(`${question.tip}`);
    }

    const seeFeedBack = () => {
        swal(`${question.hasFeedBack ?
            question.feedBack : "Não há feedback para essa questão!"}`);
    }

    return (
        <div className="main_question_class">
            <div id="question_container">

                <div id="left_question">
                    {question.student_answer !== null ? (
                        <p>
                            {question.student_answer}
                        </p>

                    ) : (
                        
                        <textarea id="txt_id" onKeyUp={(e) => setAnswer(e)}
                            placeholder="Escreva seu codigo aqui">
                        </textarea>
                    )}

                </div>

                <div id="right_question">

                    <button onClick={showTip}>
                        <img src={lamp}></img>
                        <span className="tooltiptext">
                            Clique para ter uma dica.
                        </span>
                    </button>

                    <p id="p_question">{question.question}</p>

                    <div id="btns_question">
                        <button onClick={sendAnswer}>Enviar</button>
                        <button onClick={seeFeedBack}>Ver Feedback</button>
                    </div>
                </div>

            </div>
        </div >
    );

};

export default Question;
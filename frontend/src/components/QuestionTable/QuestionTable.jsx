import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import "./QuestionTable.css";
import next from "./next.png";

let countReq = 0;
const Question = () => {
    const { code } = useParams();
    const [questions, setQuestions] = useState([]);
    const token = JSON.parse(localStorage.getItem("token"));
    let count = 1;

    useEffect(() => {
        if (countReq === 0) {
            axios
                .get(`http://localhost:3003/questions/${code}`)
                .then((response) => {
                    if (response.data.status === 200) {
                        setQuestions(response.data.result);
                    }
                })
                .catch((err) => {
                    console.log(`Erro ao buscar questões ${err}`)
                });

            countReq++;
        }
    });

    return (
        <div className="main_questions_list">
            <div id="class_question_list">
                {questions.length > 0 ? (
                    <table>
                        <tr id="tr_header">
                            <th></th>
                            <th>Descrição / Titulo</th>
                            <th className="tb_class">Feedback</th>
                            <th className="tb_class">Click para responder</th>
                        </tr>
                        {token.email.includes("@aluno") ? (
                            questions.map((question, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{count++}</td>
                                        <td>{question.title}</td>
                                        <td>{question.hasFeedback ? 'Sim' : 'Não'}</td>
                                        <td>
                                            <Link to={`/question/${question.id_question}/class/${code}`} >
                                                <button id="btn_answer">
                                                    <img id="next" src={next}></img>
                                                </button>
                                            </Link>
                                        </td>

                                    </tr>
                                )
                            })

                        ) : (
                            questions.map((question, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{count++}</td>
                                        <td>{question.title}</td>
                                        <td>{question.hasFeedback ? 'Sim' : 'Não'}</td>
                                        <td>
                                            <Link to={`/answers/question/${question.id_question}/class/${code}`} >
                                                <button id="btn_answer">
                                                    <img id="next" src={next}></img>
                                                </button>
                                            </Link>
                                        </td>

                                    </tr>
                                )

                            })
                        )}

                    </table>

                ) : (
                    <h1>Nenhuam questão adicionada!</h1>
                )}
            </div>
        </div>
    );
};

export default Question;
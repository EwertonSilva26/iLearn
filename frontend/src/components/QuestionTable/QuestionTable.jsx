import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import "./QuestionTable.css";
import next from "./next.png";

const Question = () => {
    const { code } = useParams();
    const [questions, setQuestions] = useState([]);
    const token = JSON.parse(sessionStorage.getItem("token"));
    let count = 0;
    let counter = 1;

    useEffect(() => {
        if (count === 0) {
            count++;
            axios
                .get(`http://localhost:3003/questions/${code}/user/${token.userId}`)
                .then((response) => {
                    if (response.data.status === 200) {
                        setQuestions(response.data.result);
                    }
                })
                .catch((err) => {
                    console.log(`Erro ao buscar questões ${err}`)
                });
        }
    });

    return (
        <div className="main_questions_list">
            <div id="class_question_list">
                {questions.length > 0 ? (
                    <table>
                        <tr id="tr_header">
                            <th id="number"></th>
                            <th>Descrição / Titulo</th>
                            {token.email.includes("@aluno") ? (
                                <th className="tb_class">Feedback</th>
                            ) : (<th className="tb_class" style={{ display: "none" }}>
                                Feedback
                            </th>
                            )}
                            {token.email.includes("@aluno") ? (
                                <th className="tb_class">
                                    Click para responder
                                </th>
                            ) : (
                                <th className="tb_class">
                                    Click para ver respostas
                                </th>
                            )}

                        </tr>
                        {token.email.includes("@aluno") ? (
                            questions.map((question, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{counter++}</td>
                                        <td>{question.title}</td>
                                        <td>{question.hasFeedBack ? 'Sim' : 'Não'}</td>
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
                                        <td>{counter++}</td>
                                        <td>{question.title}</td>
                                        {/* <td>{question.hasFeedBack ? 'Sim' : 'Não'}</td> */}
                                        <td>
                                            <Link to={`/class/${code}/question/${question.id_question}/answers`} >
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
                    <h1 style={{fontSize: "30px", marginTop: "40px"}}>
                        Nenhuam questão adicionada!
                    </h1>
                )}
            </div>
        </div>
    );
};

export default Question;
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import "./AnswerTable.css";
// import next from "./next.png";

let countReq = 0;
const AnswerTable = () => {
    const { code } = useParams();
    const { id } = useParams();
    const [infos, setInfos] = useState([]);
    const token = JSON.parse(localStorage.getItem("token"));

    useEffect(() => {
        if (countReq === 0) {
            axios
                .get(`http://localhost:3003/class/${code}/question/${id}/answers`)
                .then((response) => {
                    if (response.data.status === 200) {
                        setInfos(response.data.result);
                    }
                })
                .catch((err) => {
                    console.log(`Erro ao buscar informações ${err}`)
                });

            countReq++;
        }
    });

    return (
        <div className="main_questions_list">
            <div id="class_question_list">
                {infos.length > 0 ? (
                    <table>
                        <tr id="tr_header">
                            <th>Aluno</th>
                            <th>Questão</th>
                            <th>Algoritimo do Professor</th>
                            <th>Algoritimo do Aluno</th>
                            <th className="tb_class">Feedback</th>
                            <th className="tb_class">Responder</th>
                        </tr>
                        {infos.length > 0 ? (
                            infos.map((info, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{`${info.student_first_name.toUpperCase()} 
                                            ${info.student_middle_name.toUpperCase()} 
                                            ${info.student_last_name.toUpperCase()}`}
                                        </td>
                                        <td>{info.question}</td>
                                        <td>{info.teacher_answer}</td>
                                        <td>{info.student_answer}</td>
                                        <td>{info.hasFeedback ? info.feedback : 'Não'}</td>
                                        <td>
                                            <Link to={`/class/${code}/question/${info.id_question}/answers`} >
                                                <button id="btn_answer">
                                                    Dar Feedback
                                                </button>
                                            </Link>
                                        </td>

                                    </tr>
                                )
                            })

                        ) : (

                            <h1>Nenhuam resposta adicionada!</h1>
                        )}

                    </table>

                ) : (
                    <h1>Nenhuam resposta adicionada!</h1>
                )}
            </div>
        </div>
    );
};

export default AnswerTable;
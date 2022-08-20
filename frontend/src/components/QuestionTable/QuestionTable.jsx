import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import "./QuestionTable.css";
import next from "./next.png";

let count = 0;
let classCode = "";
const Question = () => {
    const { code } = useParams();
    const [questions, setQuestions] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        classCode = code;
        if (count === 0) {
            count = 1;
            axios
                .get(`http://localhost:3003/questions/${code}`)
                .then((response) => {
                    if (response.data.status === 200) {
                        setQuestions(response.data.result);
                        setError("");
                    }
                })
                .catch((err) => {
                    console.log(`Erro ao buscar questões ${err}`)
                    setError("Erro ao buscar questões");
                });
        }
    });

    return (
        <div className="main_questions_list">
            <div id="class_question_list">
                {questions.length > 0 ? (
                    <table>
                        <tr id="tr_header">
                            <th>ID</th>
                            <th>Descrição / Titulo</th>
                            <th>Feedback</th>
                            <th>Click para responder</th>
                        </tr>
                        {questions.length > 0 ? (
                            questions.map((question, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{question.id_question}</td>
                                        <td>{question.title}</td>
                                        <td>{question.hasFeedback ? 'Sim' : 'Não'}</td>
                                        <td>
                                            <Link to={`/question/${question.id_question}/class/${classCode}`} >
                                                <button id="btn_answer"><img id="next" src={next}></img></button>
                                            </Link>
                                        </td>

                                    </tr>
                                )
                            })

                        ) : (
                            <h1>Nenhuam questão adicionada!</h1>
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
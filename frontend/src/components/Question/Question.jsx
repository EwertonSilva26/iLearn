import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { QuestionContext } from "../../context/QuestionProvider";
import axios from "axios";

import "./Question.css";

let value = "";
const initialValue = 1;
const Question = () => {
    const { code } = useParams();
    const [questions, setQuestions] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
          if (code !== value) {
            axios
              .get(`http://localhost:3003/questions/${code}`)
              .then((response) => {
                if (response.data.status === 200) {
                  setQuestions(response.data.result);
                  setError("");
                  value = code;

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
                        <th>---</th>
                    </tr>
                    {questions.length > 0 ? (
                        questions.map((question, key) => {
                            return (
                                <tr key={key}>
                                    <td>{question.id_question}</td>
                                    <td>{question.title}</td>
                                    <td>{question.hasFeedback}</td>
                                    <td>
                                    <Link to={`/question/${question.id_question}`} >
                                        <button id="btn_answer">Responder</button>
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
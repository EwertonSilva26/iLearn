import React, { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import prism from 'react-syntax-highlighter/dist/esm/styles/prism/prism';
import axios from "axios";
import { useParams } from "react-router-dom";
import swal from 'sweetalert';

import lamp from "./img/lamp.png";
import happy from "./img/happy.png";
import tooHappy from "./img/too_happy.png";
import sad from "./img/sad.png";

import "./Question.css";

let answer = "";
let emotion = {};
let count = 0;
const Question = () => {
    const [question, setQuestion] = useState({});
    const [error, setError] = useState("");
    const [fontText, fontTextError] = useState("");
    let [modalId, setModalId] = useState("");
    let [newAnswer, setNewAnswer] = useState("");

    const { id } = useParams();
    const { code } = useParams();

    const obj = {
        questionId: id,
        classCode: code,
        userId: JSON.parse(sessionStorage.getItem('token')).userId
    }

    useEffect(() => {
        if (count === 0) {
            count++;

            axios.get(`http://localhost:3003/question/${obj.questionId}/${obj.classCode}/${obj.userId}`)
                .then((response) => {
                    if (response.data.status === 200) {
                        let result = response.data.result[0];
                        setQuestion(result);
                        setError("");

                        if (result.question.length >= 100) {
                            fontTextError("font_size_class");
                        }

                        if (result.student_answer) {
                            setNewAnswer(result.student_answer);
                        }

                        if (result.percentage) {
                            verifyPercentege(parseInt(result.percentage.split("%")));
                        }

                    }
                })
                .catch((err) => {
                    setError("Erro ao buscar questão: " + err);
                    console.log(`Erro Ocorrido: ${error}`)
                });
        }
    })

    function sendAnswer() {
        if (answer !== "") {
            let result = removeSpace(answer);
            obj.answer = answer;
            obj.percentage = `${parseFloat(result.toFixed(2))}%`;

            axios
                .post('http://localhost:3003/answer', obj)
                .then((response) => {
                    if (response.data.status === 200) {
                        createMessage("success", "Resposta enviada!", `Seu algoritimo teve ${parseFloat(result.toFixed(2))}% de similaridade!`);
                        setError("");
                    }
                    else {
                        throw Error();
                    }
                })
                .catch((err) => {
                    createMessage("error", "Erro ao enviar resposta", "Por favor tente novamente;");
                    console.log(`Erro ao enviar resposta ${err}`)
                    setError("Erro ao enviar resposta");
                });
        } else {
            createMessage("warning", "Campo vazio", 'Campo resposta não pode estar vazio!');
        }
    }

    function editAnswer() {
        if (newAnswer !== "") {
            let result = removeSpace(newAnswer);
            obj.answer = newAnswer;
            obj.percentage = `${parseFloat(result.toFixed(2))}%`;
            
            axios
                .put(`http://localhost:3003/answer/${question.id_answer}`, obj)
                .then((response) => {
                    if (response.data.status === 200) {
                        createMessage("success", "Resposta editada!", `Seu algoritimo teve ${parseFloat(result.toFixed(2))}% de similaridade!`);
                        setError("");
                    }
                    else {
                        throw Error();
                    }
                })
                .catch((err) => {
                    createMessage("error", "Erro ao editar resposta", "Por favor tente novamente;");
                    console.log(`Erro ao editar resposta ${err}`)
                    setError("Erro ao editar resposta");
                });
        } else {
            createMessage("warning", "Campo vazio", 'Campo de edição não pode estar vazio!');
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
            question.feedback : "Ainda não há feedback para essa questão!"}`);
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

    const verifyPercentege = (result) => {
        if ((result >= 80) && (result <= 100)) {
            emotion.image = tooHappy;
            emotion.message = "Parabens, seu desempenho foi muito bom!"
        } else if ((result >= 60) && (result < 80)) {
            emotion.image = happy;
            emotion.message = "Parabens, seu desempenho foi bom!"
        } else {
            emotion.image = sad;
            emotion.message = "Você não teve um desempenho adequado!"
        }
    }

    const removeSpace = (answer) => {
        const studentAnswer = removeString(answer.trim()
            .replace(/(\r\n|\n|\r)/gm, '').split(";"));

        const teacherAnswer = removeString(question.teacher_answer.trim()
            .replace(/(\r\n|\n|\r)/gm, '').split(";"));

        let similarityCounter = 0;
        for (let d = 0; d < studentAnswer.length; d++) {
            if (studentAnswer[d] == teacherAnswer[d]) {
                similarityCounter++;
            }
        }

        let result = ((similarityCounter * 1) / teacherAnswer.length) * 100;

        return result;
    }

    function createMessage(icon, title, text) {
        swal({
            icon: icon,
            title: title,
            text: text,
            button: {
                text: "Fechar"
            }
        }).then(() => {
            window.location.reload();
        });
    }

    function closeModal() {
        if (modalId !== "") {
            setModalId("");
            // setTimeout
            // window.location.reload();
        }
    }

    function openModal() {
        if(modalId === "") {
            setModalId("modal_id");
        }
    }

    function changeAnswer(e) {
        setNewAnswer(e.target.value);
    }

    return (
        <div className="main_question_class">
            {/* Modal de sucesso */}
            <div id={modalId} className="new_modal">
                <div className="new_modal-content">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <div style={{ textAlign: "center" }}>
                        <p className="p_header">Editar questão!</p>
                    </div>

                    {/* TODO - Não esta sendo possivel editar a questão */}
                    <textarea onChange={(e) => changeAnswer(e)}
                        value={newAnswer} className="edit_txt" placeholder="Escreva seu algoritimo aqui">
                    </textarea>

                    <div className="new_buttons">
                        <button className="btn" onClick={editAnswer}>
                            Enviar
                        </button>

                        <button className="btn" id="leave_page"
                            style={{ backgroundColor: "red" }}
                            onClick={closeModal}>
                            Sair
                        </button>
                    </div>
                </div>
            </div>


            <div id="div_question">
                <p className={fontText} id="question">{question.question}</p>
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
                        <div className="answer">
                            <p id="answer">
                                <SyntaxHighlighter language="c" style={prism}>
                                    {question.student_answer}
                                </SyntaxHighlighter>
                            </p>
                            <button id="btn_edit" onClick={() => openModal()}>Editar</button>
                        </div>

                    ) : (

                        <textarea id="txt_id" onChange={(e) => setAnswer(e)}
                            onKeyUp={(e) => setAnswer(e)}
                            placeholder="Escreva seu algoritimo aqui">
                        </textarea>
                    )}

                </div>

                <div id="right_question">

                    <div id="id_feedback">
                        <p id="p_feedback">Clique para ter acesso ao feedback enviado pelo seu professor:</p>
                        <button id="btn_feedback" onClick={seeFeedBack}>Ver Feedback</button>
                    </div>

                    {question.percentage ? (
                        <div className="percentageStyle">
                            <span className="percentageSpan">
                                Sua resposta teve {question.percentage} de similaridade
                            </span>
                        </div>
                    ) : (

                        <span className="percentageSpan" style={{ display: "none" }}></span>
                    )}

                    <div className="emotion"
                        style={{ display: "flex", justifyContent: "center", marginRight: "10px" }}>

                        <p id="success_msg" style={{ marginRight: "3px" }}>{emotion.message}</p>


                        {emotion.image ? (
                            <img id="emotion_img" src={emotion.image} style={{ width: "45px" }}></img>

                        ) : (

                            <img id="emotion_img" src={emotion.image} style={{ display: "none" }}></img>
                        )}

                    </div>

                    {!question.student_answer ? (
                        <div className="div_answer">
                            <button id="btn_send_answer" onClick={sendAnswer}>Enviar</button>
                        </div>
                    ) : (

                        <div className="div_answer" style={{ display: "none" }}></div>
                    )}
                </div>

            </div>
        </div >
    );

};

export default Question;
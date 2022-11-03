import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import swal from 'sweetalert';

import "./QuestionTable.css";

import next from "./img/next.png";
import pencil from "./img/pencil.png"
import authentication from '../../authentication.js';

const Question = () => {

    if (authentication().isAuthenticated === false) {
        window.location.href = "http://localhost:3000/login";
    }

    const { code } = useParams();
    const [questions, setQuestions] = useState([]);
    const token = JSON.parse(sessionStorage.getItem("token"));
    const [countNumber, setCountNumber] = useState(0);
    let [questionId, setQuestionId] = useState(0);
    let [modalId, setModalId] = useState("");
    let [title, setTitle] = useState("");
    let [question, setQuestion] = useState("");
    let [answer, setAsnwer] = useState("");
    let [tip, setTip] = useState("");
    let [className, setClassName] = useState("");
    let counter = 1;

    useEffect(() => {
        if (countNumber === 0) {
            axios
                .get(`http://localhost:3003/questions/${code}/user/${token.userId}/email/${token.email}`, {
                    headers: {
                        'Authorization': token.token,
                    },
                })
                .then((response) => {
                    if (response.data.status === 200) {
                        setQuestions(response.data.result[0]);
                        
                        let obj = response.data.result[0];
                        let newClassName = obj[0].class_name;

                        setClassName(newClassName);
                        
                        setCountNumber(1);
                    }
                })
                .catch((err) => {
                    console.log(`Erro ao buscar questões ${err}`)
                });

        }
    });

    function closeModal() {
        if (modalId !== "") {
            setModalId("");
        }
    }

    function openModal(question) {
        if (modalId === "") {
            setTitle(question.title);
            setQuestion(question.question);
            setAsnwer(question.teacher_answer);
            setTip(question.tip);
            setQuestionId(question.id_question);
            setModalId("modal_id");
        }
    }

    function verifyFields(obj) {
        let empty;

        if (obj.newTitle === "" ||
            obj.newQuestion === "" ||
            obj.newAnswer === "" ||
            obj.newTip === "") {

            empty = true;

        } else { empty = false; }

        return empty;
    }

    function changeTitle(e) { setTitle(e); }

    function changeAnswer(e) { setAsnwer(e); }

    function changeQuestion(e) { setQuestion(e); }

    function changeTip(e) { setTip(e); }

    function editQuestion() {

        const newQuestion = {
            newTitle: title,
            newQuestion: question,
            newAnswer: answer,
            newTip: tip
        }

        if (verifyFields(newQuestion)) {
            swal({
                icon: "warning",
                title: "Campo vazio!",
                text: "Todos os campos são obrigatórios!",
                button: {
                    text: "Fechar"
                }
            }).then(() => {
                return;
            });

            return;
        }

        axios
            .put(`http://localhost:3003/question/${questionId}`, newQuestion, {
                headers: {
                    'Authorization': token.token,
                },
            })
            .then((response) => {
                if (response.status === 204) {
                    swal({
                        icon: "success",
                        title: "Questão editada!",
                        text: "Questão editada com sucesso!",
                        button: {
                            text: "Fechar"
                        }
                    }).then(() => {
                        window.location.reload();
                    });
                }
            })
            .catch((err) => {
                console.log(`Erro ao buscar questões ${err}`);

                swal({
                    icon: "error",
                    title: "Questão não editada!",
                    text: "Questão não editada tente novamente!",
                    button: {
                        text: "Fechar"
                    }
                }).then(() => {
                    window.location.reload();
                });
            });
    }

    return (
        <div className="main_questions_list">

            {/* Modal de sucesso */}
            <div id={modalId} className="new_modal">
                <div className="new_modal-content">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <div style={{ textAlign: "center", marginBottom: "20px" }}>
                        <p className="p_header">Editar questão!</p>
                    </div>

                    <label>Titulo</label>
                    <input value={title}
                        style={{ height: "25px" }}
                        className="editText"
                        placeholder="Escreva o titulo da questão aqui"
                        onChange={(e) => changeTitle(e.target.value)}>
                    </input>
                    <br></br>

                    <label>Questão</label>
                    <textarea value={question}
                        className="editText"
                        placeholder="Escreva o enunciado da questão aqui"
                        onChange={(e) => changeQuestion(e.target.value)}>
                    </textarea>

                    <label>Resposta</label>
                    <textarea value={answer}
                        style={{ height: "150px" }}
                        className="editText"
                        placeholder="Escreva a resposta da questao aqui"
                        onChange={(e) => changeAnswer(e.target.value)}>
                    </textarea>

                    <label>Dica</label>
                    <textarea value={tip}
                        className="editText"
                        placeholder="Escreva a dica da questão aqui"
                        onChange={(e) => changeTip(e.target.value)}>
                    </textarea>

                    <div className="newButtons" >
                        <button className="btn"
                            style={{ width: "100px" }}
                            onClick={editQuestion}>
                            Enviar
                        </button>

                        <button className="btn" id="leave_page"
                            style={{ backgroundColor: "red", width: "100px" }}
                            onClick={closeModal}>
                            Sair
                        </button>
                    </div>
                </div>
            </div>

            <div id="class_question_list">
                <h2>{className}</h2>
                {questions.length > 0 ? (
                    <table>
                        <tr id="tr_header">
                            <th id="number"></th>
                            <th>Descrição / Titulo</th>
                            {token.email.includes("@aluno") ? (
                                <th className="tb_class">Feedback</th>
                            ) : (
                                <th className="tb_class" style={{ display: "none" }}>
                                    Feedback
                                </th>
                            )}
                            {!token.email.includes("@aluno") ? (
                                <th className="tb_class">Editar Questão</th>
                            ) : (
                                <th className="tb_class" style={{ display: "none" }}>
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
                                                    <img className="btn_answer" src={next} alt="Proximo"></img>
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
                                        <td>
                                            <button className="btn_answer" onClick={() => { openModal(question) }}>
                                                <img id="questionImg" src={pencil} alt="Lapis para edição"></img>
                                            </button>
                                        </td>
                                        <td>
                                            <Link to={`/class/${code}/question/${question.id_question}/answers`} >
                                                <button className="btn_answer">
                                                    <img id="questionImg" src={next} alt="Proximo"></img>
                                                </button>
                                            </Link>
                                        </td>

                                    </tr>
                                )

                            })
                        )}

                    </table>

                ) : (
                    <h1 style={{ fontSize: "30px", marginTop: "40px" }}>
                        Nenhuam questão adicionada!
                    </h1>
                )}
            </div>
        </div>
    );
};

export default Question;
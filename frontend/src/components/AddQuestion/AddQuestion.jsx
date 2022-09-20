import React from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";

import "./AddQuestion.css";

const AddQuestion = () => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    let [errorTitle, setErrorTitle] = useState("");
    let [errorQuestion, setErrorQuestion] = useState("");
    let [errorAnswer, setErrorAnswer] = useState("");
    let [errorTip, setErrorTip] = useState("");
    let [modalId, setModalId] = useState("");
    let [errorModalId, setErrorModalId] = useState("");
    const { code } = useParams();
    let hasError = 0;

    function validateForm(event) {
        if (event.target[0].value.length === 0) {
            if (errorTitle === "") {
                setErrorTitle((errorTitle += "O campo título é obrigatório! "));
            }
            hasError++;
        }
        if (event.target[1].value.length === 0) {
            if (errorQuestion === "") {
                setErrorQuestion((errorQuestion += "O campo questão é obrigatório! "));
            }
            hasError++;
        }
        if (event.target[2].value.length === 0) {
            if (errorAnswer === "") {
                setErrorAnswer((errorAnswer += "O campo resposta é obrigatório! "));
            }
            hasError++;
        }
        if (event.target[3].value.length === 0) {
            if (errorTip === "") {
                setErrorTip((errorTip += "O campo dica é obrigatório! "));
            }
            hasError++;
        }

        return hasError > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (validateForm(event)) {
            return;
        }

        const question = {
            user_id: token.userId,
            title: event.target[0].value,
            question: event.target[1].value,
            teacherAnswer: event.target[2].value,
            tip: event.target[3].value,
            classCode: code
        };

        axios
            .post("http://localhost:3003/question", question, {
                headers: {
                    Authorization: token.token,
                },
            })
            .then((response) => {
                if (response.status === 204) {
                    setModalId("modal_id");
                }
            }).catch((e) => {
                console.log(JSON.stringify(e));
                setErrorModalId("modal_id");
            });

    }

    function closeModal() {
        if (modalId !== "") {
            setModalId("");
        }
        if (errorModalId !== "") {
            setErrorModalId("");
        }

        setErrorQuestion("");
        setErrorTitle("");
        setErrorAnswer("");
        setErrorTip("");

        document.querySelector("#input_title").value = "";
        document.querySelector("#txt_question").value = "";
        document.querySelector("#txt_answer").value = "";
        document.querySelector("#txt_tip").value = "";
    }

    return (
        <div className="add-question-body">

            {/* Modal de sucesso */}
            <div id={modalId} class="modal">
                <div class="modal-content">
                    <span class="close" onClick={closeModal}>&times;</span>
                    <p className="p_message">Questão adicionada com sucesso!</p>
                    <div className="buttons">
                        <button onClick={closeModal}>
                            Adicionar nova questão
                        </button>

                        <Link to={`/classes/teacher/${token.userId}`}>
                            <button id="leave_page"
                                style={{ backgroundColor: "red" }}
                                onClick={closeModal}>
                                Sair
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Modal de erro */}
            <div id={errorModalId} class="modal">
                <div class="modal-content">
                    <span class="close" onClick={closeModal}>&times;</span>
                    <p className="p_message" style={{ backgroundColor: "lightcoral" }}>
                        Erro ao enviar questão!
                    </p>
                </div>
            </div>

            <div className="add-question-container">
                <Form onSubmit={handleSubmit}>
                    <label>Titulo</label>
                    <Form.Group size="lg" controlId="title">
                        <Form.Control id="input_title" autoFocus type="text"
                            placeholder="Insira o título/descrição da questão" maxLength="500"
                            onKeyUp={() => { setErrorTitle("") }} />
                    </Form.Group>
                    <span className="error-message">{errorTitle}</span>

                    <label>Questão</label>
                    <Form.Group size="lg" controlId="content">
                        <Form.Control id="txt_question" as="textarea"
                            rows="5" placeholder="Insira o texto da questão"
                            onKeyUp={() => { setErrorQuestion("") }} />
                    </Form.Group>
                    <span className="error-message">{errorQuestion}</span>

                    <label>Resposta</label>
                    <Form.Group size="lg" controlId="content">
                        <Form.Control id="txt_answer" as="textarea"
                            rows="5" placeholder="Insira a resposta da questão"
                            onKeyUp={() => { setErrorAnswer("") }} />
                    </Form.Group>
                    <span className="error-message">{errorAnswer}</span>

                    <label>Dica</label>
                    <Form.Group size="lg" controlId="content">
                        <Form.Control id="txt_tip" as="textarea"
                            rows="5" placeholder="Insira a dica para a questão"
                            onKeyUp={() => { setErrorTip("") }} />
                    </Form.Group>
                    <span className="error-message">{errorTip}</span>

                    <Button block size="lg" type="submit">
                        Adicionar Questão
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default AddQuestion;
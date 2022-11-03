import React from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import swal from 'sweetalert';

import authentication from '../../authentication.js';

import "./AddQuestion.css";

const AddQuestion = () => {

    if (authentication().isAuthenticated === false) {
        window.location.href = "http://localhost:3000/login";
    }

    const token = JSON.parse(sessionStorage.getItem("token"));
    let [modalId, setModalId] = useState("");
    let [errorModalId, setErrorModalId] = useState("");

    const { code } = useParams();
    let hasError = 0;
    let countCalls = 0

    function validateForm(event) {
        if (event.target[0].value.length === 0) {
            hasError++;
        }
        if (event.target[1].value.length === 0) {
            hasError++;
        }
        if (event.target[2].value.length === 0) {
            hasError++;
        }
        if (event.target[3].value.length === 0) {
            hasError++;
        }

        return hasError > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (countCalls === 0) {
            countCalls++;
            if (validateForm(event)) {
                swal({
                    icon: "warning",
                    title: "Campo vazio!",
                    text: "Todos os campos são obrigatórios!",
                    button: {
                        text: "Fechar"
                    }
                }).then(() => {
                    window.location.reload();
                });
    
                return;
            }

            const question = {
                userId: token.userId,
                title: event.target[0].value,
                question: event.target[1].value,
                teacherAnswer: event.target[2].value,
                tip: event.target[3].value,
                classCode: code
            };

            axios
                .post("http://localhost:3003/question", question, {
                    headers: {
                        'Authorization': token.token,
                    },
                })
                .then((response) => {
                    if (response.status === 201) {
                        setModalId("modal_id");
                        countCalls = 0;
                    }
                }).catch((e) => {
                    console.log(JSON.stringify(e));
                    setErrorModalId("modal_id");
                });
        }
    }

    function closeSucessModal() {
        if (modalId !== "") {
            setModalId("");
        }

        window.location.href = `/classes/teacher/${token.userId}`;
    }

    function closeModal() {
        if (modalId !== "") {
            setModalId("");
        }
        if (errorModalId !== "") {
            setErrorModalId("");
        }

        cleanFields();

    }

    function cleanFields() {
        document.querySelector("#input_title").value = "";
        document.querySelector("#txt_question").value = "";
        document.querySelector("#txt_answer").value = "";
        document.querySelector("#txt_tip").value = "";
    }

    return (
        <div className="add-question-body">

            {/* Modal de sucesso */}
            <div id={modalId} className="modal">
                <div className="modal-content">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <p className="p_message">Questão adicionada com sucesso!</p>
                    <div className="buttons">
                        <button onClick={closeModal}>
                            Adicionar nova questão
                        </button>

                        <button id="leave_page"
                            style={{ backgroundColor: "red" }}
                            onClick={closeSucessModal}>
                            Sair
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal de erro */}
            <div id={errorModalId} className="modal">
                <div className="modal-content">
                    <span className="close" onClick={closeModal}>&times;</span>
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
                            placeholder="Insira o título / descrição da questão" maxLength="500"
                        />
                    </Form.Group>

                    <label>Questão</label>
                    <Form.Group size="lg" controlId="content">
                        <Form.Control id="txt_question" as="textarea"
                            rows="5" placeholder="Insira o texto da questão"
                        />
                    </Form.Group>

                    <label>Resposta</label>
                    <Form.Group size="lg" controlId="content">
                        <Form.Control style={{height: "170px"}} id="txt_answer" as="textarea"
                            rows="5" placeholder="Insira a resposta da questão"
                        />
                    </Form.Group>

                    <label>Dica</label>
                    <Form.Group size="lg" controlId="content">
                        <Form.Control id="txt_tip" as="textarea"
                            rows="5" placeholder="Insira a dica para a questão"
                        />
                    </Form.Group>

                    <Button block size="lg" type="submit">
                        Adicionar Questão
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default AddQuestion;
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import swal from 'sweetalert';

import "./AnswerTable.css";
import next from "./next.png";

let countReq = 0;
const AnswerTable = () => {
    const { code } = useParams();
    const { id } = useParams();
    const [infos, setInfos] = useState([]);
    
    let [objectInfo, setObjectInfo] = useState({});
    let [modalId, setModalId] = useState("");
    let [error, setError] = useState("");
    
    const token = JSON.parse(sessionStorage.getItem("token"));

    let feedback = "";

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

    function sendFeedback() {

        if (feedback === "") {
            setError("block");
            return;
        }

        const obj = {
            classId: objectInfo.classId,
            questionId: objectInfo.questionId,
            answerId: objectInfo.answerId,
            studentId: objectInfo.studentId
        }

        const object = {
            id: objectInfo.id,
            feedback
        }
        axios
            .put(`http://localhost:3003/class/${obj.classId}/question/${obj.questionId}
            /answer/${obj.answerId}/student/${obj.studentId}`, object)
            .then((response) => {
                debugger
                if (response.status === 204) {
                    closeModal();
                    generateMessage("Sucesso",
                        "Seu feedback foi enviado com sucesso!!!", "success");
                }
            })
            .catch((err) => {
                console.log(`Erro ao enviar feedback ${err}`);
                closeModal();

                generateMessage("Erro",
                    "Não foi possivel enviar o feedback!!!", "error");
            });
    }

    function generateMessage(title, text, icon) {
        swal({
            title: title,
            text: text,
            icon: icon,
            button: {
                text: "Fechar"
            }
        }).then(() => {
            window.location.reload();
        });
    }

    function setFeedback(event) { feedback = event.target.value; }

    function closeModal() {
        setModalId("");
        document.querySelector("#txt_modal").value = "";
    }

    function setObject(infos) {
        setModalId("modal_id");

        document.querySelector("#txt_modal").value =
            infos.hasFeedBack ? infos.feedback : "";

        setObjectInfo({
            classId: infos.id_class,
            questionId: infos.id_question,
            answerId: infos.id_answer,
            studentId: infos.id_student,
            id: infos.id_class_question_answer_student
        })
    }

    return (
        <div className="answer_list">

            {/* Modal - Enviar feedback */}
            <div id={modalId} class="fdb_modal">
                <div class="fdb_modal-content">
                    <span class="btn_close" onClick={closeModal}>&times;</span>
                    <p className="fdb_p_message">Deixe seu feedback para o aluno!</p>

                    <textarea id="txt_modal"
                        placeholder="Digite o texto aqui"
                        minLength="10" maxLength="1000"
                        autoFocus
                        onKeyUp={(e) => setFeedback(e)}
                        onClick={() => setError("none")}>
                    </textarea>

                    <div className="buttons">

                        <button className="fdb_cancel"
                            style={{ backgroundColor: "red" }}
                            onClick={closeModal}>
                            Cancelar
                        </button>

                        <button onClick={() => {
                            sendFeedback();
                        }} className="fdb_cancel">
                            Enviar
                        </button>

                    </div>

                    <span className="error_message"
                        style={{ display: `${error}` }}>
                        Texto deve ter no minino 10 caracteres.
                    </span>

                </div>
            </div>

            <div id="class_answer_list">
                {infos.length > 0 ? (
                    <>
                        <h1>{infos[0].class_name}</h1>
                        <p id="queston">{infos[0].question}</p>
                        <table>
                            <tr id="tr_header">
                                <th>Aluno</th>
                                <th>Algoritimo do Professor</th>
                                <th>Algoritimo do Aluno</th>
                                <th>Porcentagem de similaridade</th>
                                <th className="tb_class">Feedback</th>
                                <th className="tb_class">Deixe o feedback para os alunos</th>
                            </tr>
                            {infos.length > 0 ? (
                                infos.map((info, key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{`${info.student_first_name.toUpperCase()} 
                                            ${info.student_middle_name.toUpperCase()} 
                                            ${info.student_last_name.toUpperCase()}`}
                                            </td>
                                            <td>{info.teacher_answer}</td>
                                            <td>{info.student_answer}</td>
                                            <td  style={{ fontSize: "20px" }}>{info.percentage}</td>
                                            <td>{info.feedback ? info.feedback : ''}</td>
                                            <td>
                                                <button id="btn_answer" onClick={() => { setObject(info) }}>
                                                    <img id="next" src={next}></img>
                                                </button>
                                            </td>

                                        </tr>
                                    )
                                })

                            ) : (

                                <h1>Nenhuam resposta adicionada!</h1>
                            )}

                        </table>
                    </>

                ) : (
                    <h1>Nenhuam resposta adicionada!</h1>
                )}
            </div>
        </div>
    );
};

export default AnswerTable;
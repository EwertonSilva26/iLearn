import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import prism from 'react-syntax-highlighter/dist/esm/styles/prism/prism';

import axios from "axios";
import swal from 'sweetalert';

import "./AnswerTable.css";
import next from "./next.png";

let number = 0;
const AnswerTable = () => {
    const { code } = useParams();
    const { id } = useParams();
    const [infos, setInfos] = useState([]);

    let [objectInfo, setObjectInfo] = useState({});
    let [modalId, setModalId] = useState("");
    let [className, setClassName] = useState("");
    let [question, setQuestion] = useState("");
    let [error, setError] = useState("");

    let feedback = "";


    useEffect(() => {
        if (number === 0) {
            number++
            
            axios
                .get(`http://localhost:3003/class/${code}/question/${id}/answers`)
                .then((response) => {
                    if (response.data.status === 200) {
                        setInfos(response.data.result);
                        setClassName(response.data.result[0].class_name);
                        setQuestion(response.data.result[0].question);
                    }
                })
                .catch((err) => {
                    console.log(`Erro ao buscar informações ${err}`)
                });
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

    function showFeedback(info) {
        let teacherFeedback = info.feedback ? info.feedback : 'Você ainda não adicionou feedback para essa resposta!';

        swal({
            title: "Feedback",
            text: teacherFeedback,
            button: {
                text: "Fechar"
            }
        })
    }

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
            id: infos.id_class_question_answer_student_teacher
        })

    }

    return (
        <div className="answer_list">

            {/* Modal - Enviar feedback */}
            <div id={modalId} className="fdb_modal">
                <div className="fdb_modal-content">
                    <span className="btn_close" onClick={closeModal}>&times;</span>
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
                <h1 className="class_name" style={{ marginTop: "20px", fontSize: "25px"}}>{className}</h1>
                <p id="queston">{question}</p>
                {infos.length > 0 ? (
                    <div className="central">
                        <table>
                            <tr id="tr_header">
                                <th style={{ width: "200px" }}>Aluno</th>
                                <th>Algoritmo do Professor</th>
                                <th>Algoritmo do Aluno</th>
                                <th style={{ padding: "10px" }}>Similaridade</th>
                                <th className="tb_class">Feedback</th>
                                <th className="tb_class" style={{width: "100px"}}>Deixe o feedback para os alunos</th>
                            </tr>
                            {infos.length > 0 ? (
                                infos.map((info, key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{`${info.student_first_name.toUpperCase()} 
                                            ${info.student_middle_name.toUpperCase()} 
                                            ${info.student_last_name.toUpperCase()}`}
                                            </td>
                                            <td>
                                                <SyntaxHighlighter
                                                    lineProps={{ style: { whiteSpace: 'pre-wrap' } }}
                                                    wrapLines={true}
                                                    language="c" style={ prism }>
                                                    {info.teacher_answer}
                                                </SyntaxHighlighter>
                                            </td>

                                            <td>
                                                <SyntaxHighlighter
                                                    lineProps={{ style: { whiteSpace: 'pre-wrap' } }}
                                                    wrapLines={true}
                                                    language="c" style={prism}>
                                                    {info.student_answer}
                                                </SyntaxHighlighter>
                                            </td>

                                            <td style={{ fontSize: "20px" }}>{info.percentage}</td>
                                            <td><button style={
                                                {backgroundColor: info.feedback ? "cornflowerblue" : 'white',
                                                 color: info.feedback ? "white" : 'black'}}
                                             id="button" className="button" onClick={() => {showFeedback(info)}}>Ver Feedback</button></td>
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
                    </div>

                ) : (
                    <h1>Nenhuam resposta adicionada!</h1>
                )}
            </div>
        </div>
    );
};

export default AnswerTable;
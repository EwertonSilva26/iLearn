import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import swal from 'sweetalert';

import "./Class.css";
import pencil from "./img/pencil.png"
import trashCan from "./img/trash-can.png";
import plus from "./img/plus.png";

const Class = ({ props }) => {
    const token = sessionStorage.getItem("token");
    const location = useLocation();
    const [errorClass, setErrorClass] = useState("");
    const [modalIdClass, setModalIdClass] = useState("");

    let newClassName = "";

    let id = "";
    if (props.itemTotal > 0) { id = 'id_margin_botton'; }

    function deleteClass() {
        axios
            .delete(`http://localhost:3003/class/${props.class_code}`)
            .then((response) => {
                if (response.status === 204) {
                    createNewMessage("success", "Turma excluida!",
                        `A turma "${props.class_name}" 
                    foi excluida com sucesso!`);
                }
            })
            .catch((err) => {
                console.log(`Erro ao deletar turma ${JSON.stringify(err)}`)
                createNewMessage("error", "Turma não foi excluida!",
                    "Tente novamente!");

            });

    }

    function UpdateClassName() {

        if (newClassName === "") {
            setErrorClass("Campo não pode estar vazio!");
            return
        }

        axios
            .put(`http://localhost:3003/class/${props.class_code}`,
                { className: newClassName })
            .then((response) => {
                if (response.status === 204) {
                    createNewMessage("success", "Turma foi atualizada!",
                        `Novo nome da turma: ${newClassName}`);
                }
            })
            .catch((err) => {
                console.log(`Erro ao deletar turma ${JSON.stringify(err)}`)

                createNewMessage("error", "Nome da turma não foi atualizada!",
                    "Tente novamente!");
            });

    }

    function closeModalClass() {
        if (modalIdClass !== "") {
            setModalIdClass("");
            setErrorClass("");
        }
    }

    function createNewMessage(icon, title, text) {
        swal({
            icon: icon,
            title: title,
            text: text,
            button: {
                text: "fechar"
            }
        }).then(() => {
            window.location.reload();
        });
    }

    function openModalClass() {
        setModalIdClass("modal_id_class");
    }

    function setNewClassName(e) {
        newClassName = e.target.value;
    }

    return (
        <div className="main_class">

            {/* Modal */}
            <div id={modalIdClass} className="modalClass">
                <div className="modal_content_class">
                    <span className="classClose" onClick={closeModalClass}>&times;</span>
                    <p className="pMessageClass" style={{ fontSize: "30px" }}>Editar nome da turma</p>

                    <input onChange={(e) => { setNewClassName(e) }} style={
                        {
                            width: "98%", marginTop: "-10px",
                            height: "30px", borderRadius: "10px"
                        }}
                        placeholder="Insira novo nome para a turma">
                    </input>
                    <button onClick={UpdateClassName} style={{ float: "right", marginTop: "20px", marginRight: "4px", width: "100px" }}>
                        Enviar
                    </button>
                    {errorClass ? (
                        <span className="errorMessageClass" style={{ display: "block" }}>
                            {errorClass}
                        </span>
                    ) : (
                        <span className="errorMessageClass" style={{ display: "none" }}>
                            {errorClass}
                        </span>
                    )}

                </div>
            </div>

            {token &&
                (!location.pathname.match(`/classes/student/${JSON.parse(token).userId}`))
                ? (
                    <div className="all_classes" id={id}>
                        <h1 className="class_name_id">{props.class_name}</h1>
                        <h1 className="class_name_id">ID: {props.class_code}</h1>
                        <div id="enter_class">
                            <Link to={`/questions/class/${props.class_code}`} >
                                <button>Entrar</button>
                            </Link>
                        </div>

                        <div className="buttons">
                            <button onClick={deleteClass}><img src={trashCan} alt="Lata de lixo"></img></button>
                            <button onClick={openModalClass}><img src={pencil} alt="Pincel"></img></button>

                            <Link to={`/teacher/class/${props.class_code}/add/question`}>
                                <button><img src={plus} alt="Sinal de soma"></img></button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="all_classes" id={id}>

                        <h1 className="class_name_id">{props.class_name}</h1>
                        <h1 className="class_name_id">ID: {props.class_code}</h1>
                        <div id="enter_class">
                            <Link to={`/questions/class/${props.class_code}`} >
                                <button>Entrar</button>
                            </Link>
                        </div>
                    </div>
                )}
        </div>
    );
};

export default Class;
import React from "react";
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

    let id = "";
    if (props.itemTotal > 0) { id = 'id_margin_botton'; }

    function deleteClass() {
        axios
            .delete(`http://localhost:3003/class/${props.class_code}`)
            .then((response) => {
                if (response.status === 204) {
                    swal({
                        icon: "success",
                        title: "Turma excluida!",
                        text: `A turma "${props.class_name}"
                        foi excluida com sucesso!`,
                        button: {
                            text: "fechar"
                        }
                    }).then(() => {
                        window.location.reload();
                    });
                }
            })
            .catch((err) => {
                console.log(`Erro ao deletar turma ${JSON.stringify(err)}`)

                swal({
                    icon: "error",
                    title: "Turma não foi excluida!",
                    text: "Tente novamente!",
                    button: {
                        text: "fechar"
                    }
                }).then(() => {
                    window.location.reload();
                });
            });

    }

    return (
        <div className="main_class">
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
                            <button onClick={deleteClass}><img src={trashCan}></img></button>
                            <button><img src={pencil}></img></button>

                            <Link to={`/teacher/class/${props.class_code}/add/question`}>
                                <button><img src={plus}></img></button>
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
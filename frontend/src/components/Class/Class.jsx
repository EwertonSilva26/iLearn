import React from "react";
import { Link, useLocation } from "react-router-dom";

import "./Class.css";
import pencil from "./img/pencil.png"
import trashCan from "./img/trash-can.png";
import plus from "./img/plus.png";

const Class = ({ props }) => {
    const token = sessionStorage.getItem("token");
    const location = useLocation();

    let id = "";
    if (props.itemTotal > 0) { id = 'id_margin_botton'; }

    return (
        <div className="main_class">
            {token &&
                (!location.pathname.match(`/classes/student/${JSON.parse(token).userId}`))
                ? (
                    <div className="all_classes" id={id}>
                        <h1 className="class_name_id">Nome da turma: {props.class_name}</h1>
                        <h1 className="class_name_id">ID: {props.class_code}</h1>
                        <div id="enter_class">
                            <Link to={`/questions/class/${props.class_code}`} >
                                <button>Entrar</button>
                            </Link>
                        </div>

                        <div className="buttons">
                            <button><img src={trashCan}></img></button>
                            <button><img src={pencil}></img></button>
                            
                            <Link to={`/teacher/class/${props.class_code}/add/question`}>
                            <button><img src={plus}></img></button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="all_classes" id={id}>
                        <h1 className="class_name_id">Nome da turma: {props.class_name}</h1>
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
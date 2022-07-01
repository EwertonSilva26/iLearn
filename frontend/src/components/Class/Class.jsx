import React from "react";
import { Link } from "react-router-dom";

import "./Class.css";

const Class = ({ props }) => {

    return (
        <div className="main_class">
            <div className="all_classes">
                <h1 className="class_name_id">Nome da turma: {props.class_name}</h1>
                <h1 className="class_name_id">ID: {props.class_code}</h1>
                <div id="enter_class">
                    <Link to={"/choice/"} >
                        <button>Entrar</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Class;
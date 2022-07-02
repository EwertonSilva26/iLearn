import React from "react";
import { Link, useParams } from "react-router-dom";

import "./Optional.css";

const Optional = () => {

    const { code } = useParams();

    return (
        <div className="main_opt">
            <div id="container_opt">
                <div id="btn_left_opt">
                    <Link to={`/class/questions/${code}`} >
                    <button>Questoẽs</button>
                    </Link>
                </div>

                <div id="btn_rigth_opt">
                    <Link to={`/class/students/${code}`} >
                    <button>Ver alunos</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Optional;
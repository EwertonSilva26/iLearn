import React from "react";
import { Link } from "react-router-dom";

import "./Optional.css";

const Optional = () => {

    return (
        <div className="main_opt">
            <div id="container_opt">
                <div id="btn_left_opt">
                    <Link to={"/questions/"} >
                    <button>Questoẽs</button>
                    </Link>
                </div>

                <div id="btn_rigth_opt">
                    <Link to={"/students/"} >
                    <button>Ver alunos</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Optional;
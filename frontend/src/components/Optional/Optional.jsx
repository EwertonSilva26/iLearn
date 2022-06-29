import React from "react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { OptionalContext } from "../../context/OptionalProvider";

import "./Optional.css";

const Optional = () => {

    return (
        <div className="main">
            <div id="container">
                <div id="btn_left">
                    <Link to={"/questions/"} >
                    <button>Questoẽs</button>
                    </Link>
                </div>

                <div id="btn_rigth">
                    <Link to={"/students/"} >
                    <button>Ver alunos</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Optional;
import React from "react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ClassContext } from "../../context/Classprovider";

import "./Class.css";

const Class = ({ props }) => {

    return (
        <div className="main">
            <div id="classes">
                <h1>Nome da turma: {props.class_name}</h1>
                <h1 id="h1Id">ID: {props.class_code}</h1>
                <div id="btn_rigth">
                    <Link to={"/choice/"} className="card-link">
                    <button>Entrar</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Class;
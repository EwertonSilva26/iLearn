import React from "react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ClassContext } from "../../context/Classprovider";

// import "./Class.css";

const Class = ({ props }) => {

    return (
        <div className="mainClass">
            <div className="Allclasses">
                <h1>Nome da turma: {props.class_name}</h1>
                <h1 className="h1Id">ID: {props.class_code}</h1>
                <div className="btn_enter">
                    <Link to={"/choice/"} >
                    <button>Entrar</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Class;
import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { HomeStudentContext } from "../../context/HomeStudentProvider";

import "./HomeStudent.css";

const HomeStudent = () => {
    const { insertClass } = useContext(HomeStudentContext);

    let classCode = "";

    function setClassCode(event) {
        classCode = event.target.value;
    }

    function inserStudentInClass() {
        if (classCode !== "") {
            insertClass(classCode)
        }
    }

    return (
        <div className="main">
            <div id="classes">
                <h1>Ver minhas turmas</h1>
                <Link to={"/classes"} >
                    <button id="id_myClasses">Minhas turmas</button>
                </Link>
            </div>

            <div id="container">
                <div id="new_classes">
                    <h1>Nova turma</h1>

                    <input placeholder="Insira o codigo da turma" onMouseOut={(e) => setClassCode(e)}></input>
                    <button id="btn_create_class" onClick={inserStudentInClass}>Entrar na turma</button>
                </div>

                <div id="new_quiz">
                    <h1>Há um total de 0 feedBacks do professor</h1>
                </div>
            </div>
        </div>
    );
};

export default HomeStudent;
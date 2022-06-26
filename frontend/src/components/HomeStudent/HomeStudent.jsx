import React from "react";
import { useState, useEffect } from "react";
// import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import { HomeStudentContext } from "../../context/HomeStudentProvider";

import "./HomeStudent.css";

const HomeStudent = () => {
    const { getClass } = useContext(HomeStudentContext);

    let classCode = "";

    function setClassCode(event) {
        classCode = event.target.value;
    }

    function searchClass() {
        if(classCode !== ""){
            getClass(classCode)
        }
    }


    return (
        <div className="main">
            <div id="classes">
                <h1>Ver minhas turmas</h1>
                <button id="id_myClasses">Minhas turmas</button>
            </div>

            <div id="container">
                <div id="new_classes">
                    <h1>Nova turma</h1>

                    <input placeholder="Digite o codigo da turma" onMouseOut={(e) => setClassCode(e)}></input>
                    <button id="btn_create_class" onClick={searchClass}>Entrar na turma</button>
                </div>

                <div id="new_quiz">
                    <h1>Há um total de 0 feedBacks do professor</h1>
                    {/* <button id="btn_see_questions">Meus questionários</button>
                    <button id="btn_create_questions">Novo questionário</button> */}
                </div>
            </div>
        </div>
    );
};

export default HomeStudent;
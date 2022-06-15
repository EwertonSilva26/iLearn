import React from "react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
// import { Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
import { useContext } from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import { HomeTeacherContext } from "../../context/HomeTeacherProvider";

import "./HomeTeacher.css";

const HomeTeacher = () => {
    const { createNewClass } = useContext(HomeTeacherContext);
    let className = "";

    function setClassName(event) {
        className = event.target.value;
    }

    function createClass() {
        let classCode = uuidv4().replaceAll('-', '').substring(0, 9);
        if(className !== ""){
            const objClass = {
                classCode,
                className
            }
            createNewClass(objClass)
        }
    }

    return (
        <div className="main">
            <div id="classes">
                <h1>Ver minhas turmas</h1>
                <button>Minhas turmas</button>
            </div>

            <div id="container">
                <div id="new_classes">
                    <h1>Criar nova turma</h1>
                    <h2>insira um nome para a turma</h2>
                    <input placeholder="Digite o nome da turma" onKeyUp={(e) => setClassName(e)}></input>
                    <button id="btn_create_class" onClick={createClass}>Criar turma</button>
                </div>

                <div id="new_answer">
                    <h1>Respostas</h1>
                    <p id="question_number">Um total de N questoes foram respondidas</p>
                </div>
            </div>
        </div>
    );
};

export default HomeTeacher;
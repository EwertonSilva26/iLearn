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
        <div className="mainStudent">
            <div className="myClasses">
                <h1>Ver minhas turmas</h1>
                <Link to={"/classes"} >
                    <button className="btn_myClasses">Minhas turmas</button>
                </Link>
            </div>

            <div className="containerStudent">
                <div className="new_classes_student">
                    <h1>Nova turma</h1>

                    <input placeholder="Insira o codigo da turma" onMouseOut={(e) => setClassCode(e)}></input>
                    <button className="btn_create_class_student" onClick={inserStudentInClass}>Entrar na turma</button>
                </div>

                <div className="feedbacks">
                    <h1 className="h1Feedbacks">Há um total de 0 feedBacks do professor</h1>
                </div>
            </div>
        </div>
    );
};

export default HomeStudent;
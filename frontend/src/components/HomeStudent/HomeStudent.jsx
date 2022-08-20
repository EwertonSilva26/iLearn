import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import "./HomeStudent.css";

const HomeStudent = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const insertClass = (classCode) => {
        const obj = {
            idStudent: id,
            classCode: classCode
        }

        axios
            .post("http://localhost:3003/student/classes", obj)
            .then((response) => {
                console.log(response);
                navigate("/classes/");
            })
            .catch((err) => {
                navigate("/student/" + id);
                console.log("[ERROR]: " + JSON.stringify(err))
            });
    }

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
                <h1 className="my_classes_student">Ver minhas turmas</h1>
                <Link to={`/classes/student/${id}`} >
                    <button className="btn_myClasses">Minhas turmas</button>
                </Link>
            </div>

            <div className="containerStudent">
                <div className="new_classes_student">
                    <h1 className="my_classes_student">Nova turma</h1>

                    <input id="ipt_new_class_student" placeholder="Insira o codigo da turma" onMouseOut={(e) => setClassCode(e)}></input>
                    <button id="btn_create_class_student" onClick={inserStudentInClass}>Entrar na turma</button>
                </div>

                <div className="feedbacks">
                    <h1 className="my_classes_student">Há um total de 0 feedBacks do professor</h1>
                </div>
            </div>
        </div>
    );
};

export default HomeStudent;
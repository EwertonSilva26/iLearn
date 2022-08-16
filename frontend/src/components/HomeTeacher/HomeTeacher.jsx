import React from "react";
import { v4 as uuidv4 } from 'uuid';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { HomeTeacherContext } from "../../context/HomeTeacherProvider";

import "./HomeTeacher.css";

const HomeTeacher = () => {
    const { createNewClass } = useContext(HomeTeacherContext);
    let className = "";

    function setClassName(event) {
        className = event.target.value;
    }

    function createClass() {
        let classCode = uuidv4().replaceAll('-', '').substring(0, 10);
        debugger
        if (className !== "") {
            const objClass = {
                classCode,
                className: className.toUpperCase(),
                userId: JSON.parse(sessionStorage.getItem('token')).userId
            }

            createNewClass(objClass)
        }
    }

    return (
        <div className="mainTeacher">
            <div className="classesTeacher">
                <h1 className="my_class_teacher">Ver minhas turmas</h1>
                <Link to={"/classes"} >
                    <button className="myClassesTeacher">Minhas turmas</button>
                </Link>
            </div>

            <div className="containerTeacher">
                <div className="new_classes_teacher">
                    <h1 className="my_class_teacher">Criar nova turma</h1>
                    <h2>insira um nome para a turma</h2>
                    <input id="ipt_new_class" placeholder="Digite o nome da turma" onKeyUp={(e) => setClassName(e)}></input>
                    <button className="btn_create_class" onClick={createClass}>Criar turma</button>
                </div>

                <div className="new_answer_teacher">
                    <h1 className="my_class_teacher">Respostas</h1>
                    <p className="question_number">Um total de N questoes foram respondidas</p>
                </div>
            </div>
        </div>
    );
};

export default HomeTeacher;
import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";

import "./Home.css";

const Home = () => {
    let [error, setError] = useState("");
    const { id } = useParams();
    const token = sessionStorage.getItem("token");
    const navigate = useNavigate();
    const location = useLocation();

    let className = "";

    function createNewClass(info) {
        axios
            .post("http://localhost:3003/class/create", info)
            .then((response) => {
                if (response.data.status === 201) {
                    navigate(`/classes/teacher/${id}`);
                }
                else {
                    setError("Erro ao criar a turma");
                    console.log(`Não foi possivel criar a turma - 
              ${JSON.stringify(response.data)}`)
                }
            })
            .catch((err) => {
                setError("Erro ao criar a turma");
            });
    }

    function setClassName(event) {
        className = event.target.value;
    }

    function createClass() {
        let classCode = uuidv4().replaceAll('-', '').substring(0, 10);

        if (className !== "") {
            const objClass = {
                classCode,
                className: className.toUpperCase(),
                userId: JSON.parse(sessionStorage.getItem('token')).userId
            }

            createNewClass(objClass);
        }
    }

    const insertClass = (classCode) => {
        const obj = {
            idStudent: id,
            classCode: classCode
        }

        axios
            .post("http://localhost:3003/student/classes/", obj)
            .then((response) => {
                console.log(response);
                navigate(`/classes/student/${id}`);
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
        <div>
            {token && location.pathname.match(`/student/${id}`) ? (

                <>
                    <div className="classes">
                        <h1 className="my_classes">Ver minhas turmas</h1>
                        <Link to={`/classes/student/${id}`}>
                            <button className="btn_myClasses">Minhas turmas</button>
                        </Link>
                    </div>

                    <div className="container">
                        <div className="new_classes">
                            <h1 className="my_classes">Nova turma</h1>

                            <input id="ipt_new_class" placeholder="Insira o codigo da turma"
                                onMouseOut={(e) => setClassCode(e)}
                                onKeyUp={(e) => setClassCode(e)}>
                            </input>
                            <button onClick={inserStudentInClass}>Entrar na turma</button>
                        </div>

                        <div className="feedbacks" style={{ display: "none" }}>
                            <h1 className="my_classes">Há um total de 0 feedBacks do professor</h1>
                        </div>
                    </div>
                </>

            ) : (
                <>
                    <div className="classes">
                        <h1 className="my_classes">Ver minhas turmas</h1>
                        <Link to={`/classes/teacher/${id}`} >
                            <button className="btn_myClasses">Minhas turmas</button>
                        </Link>
                    </div>

                    <div className="container">
                        <div className="new_classes">
                            <h1 className="my_classes">Criar nova turma</h1>
                            <h2>insira um nome para a turma</h2>
                            <input id="ipt_new_class" placeholder="Digite o nome da turma" onKeyUp={(e) => setClassName(e)}></input>
                            <button id="btn_create_class" onClick={createClass}>Criar turma</button>
                        </div>

                        <div className="new_classes" style={{ display: "none" }}>
                            <h1 className="my_classes">Respostas</h1>
                            <p className="question_number">Um total de N questoes foram respondidas</p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Home;
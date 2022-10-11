import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import swal from 'sweetalert';

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

                if ((response.data.result[0] !== undefined) && (response.data.result[0].number !== 0)) {
                    throw Error
                }

                if (response.data.status === 201) {
                    swal({
                        icon: "success",
                        title: "Turma criada",
                        text: "Uma nova turma foi criada com sucesso",
                        button: {
                            text: "Fechar"
                        }
                    }).then(() => {
                        navigate(`/classes/teacher/${id}`);
                        window.location.reload();
                    });

                }

            })
            .catch((err) => {
                console.log("Erro ao criar a turma: " + err);
                setError("Turma não criada - ERRO: " + error);

                swal({
                    icon: "error",
                    title: "Não foi possivel criar a turma",
                    text: "É Provavel que o nome escolhido para a turma já exista!",
                    button: {
                        text: "Fechar"
                    }
                }).then(() => {
                    window.location.reload();
                });
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
                createMessage("success", "Sucesso", "Você foi cadastrado à turma com sucesso!")
                console.log(response);
                navigate(`/classes/student/${id}`);

            })
            .catch((err) => {
                console.log("[ERROR]: " + JSON.stringify(err))
                createMessage("error", "Algo deu errado!", "Por favor tente novamente!!")
                navigate("/student/" + id);
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

    function createMessage(icon, title, text) {
        swal({
            icon: icon,
            title: title,
            text: text,
            button: {
                text: "Fechar"
            }
        }).then(() => {
            window.location.reload();
        });
    }

    return (
        <div className="main_home">
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
                            <button id="btn_enter" className="btn_myClasses"
                                onClick={inserStudentInClass}>Entrar na turma
                            </button>
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
                        <div className="new_classes" style={{ height: "200px" }}>
                            <h1 className="my_classes">Criar nova turma</h1>
                            <h2 className="h2_home" style={{ fontSize: "20px" }}>
                                insira um nome para a turma
                            </h2>
                            <input id="ipt_new_class" placeholder="Digite o nome da turma"
                                onKeyUp={(e) => setClassName(e)}>
                            </input>
                            <button className="btn_myClasses" id="btn_create_class"
                                onClick={createClass}>Criar turma
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Home;
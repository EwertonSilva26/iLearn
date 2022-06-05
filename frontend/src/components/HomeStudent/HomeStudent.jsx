import React from "react";
import { useState, useEffect } from "react";
// import { Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
import { useContext } from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import { HomeStudentContext } from "../../context/HomeStudentProvider";

import "./HomeStudent.css";

// useEffect(() => {
//     axios
//       .get("http://localhost:3003/")
//       .then((response) => { })
//       .catch((err) => {
//         // console.log(`Erro: ${err}`);
//       });
//   });

const HomeStudent = () => {
    const { homeStudent } = useContext(HomeStudentContext);

    return (
        <div className="main">
            <div id="classes">
                <h1>Ver minhas turmas</h1>
                <button>Minhas turmas</button>
            </div>

            <div id="container">
                <div id="new_classes">
                    <h1>Nova turma</h1>
                    <input></input>
                    <button id="btn_create_class">Entrar na turma</button>
                </div>

                <div id="new_quiz">
                    <h1>Questionários</h1>
                    <button id="btn_see_questions">Meus questionários</button>
                    <button id="btn_create_questions">Novo questionário</button>
                </div>
            </div>
        </div>
    );
};

export default HomeStudent;
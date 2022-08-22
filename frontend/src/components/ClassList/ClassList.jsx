import React, { useState, useEffect } from "react";
import Class from "../Class/Class";
import axios from "axios";

const ClassList = () => {
    const [error, setError] = useState("");
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:3003/classes/${JSON.parse(localStorage.getItem('token')).userId}`)
            .then((response) => {
                setClasses(response.data.result[0]);
            })
            .catch((err) => {
                console.log(`Erro ao buscar turmas ${err}`)
                setError("Erro ao buscar turmas");
            });
    });

    return (
        <div className="main">
            <h1 style={{ margin: "20px", fontSize: "25px" }}>Minhas turmas</h1>
            {classes.length > 0 ? (
                classes.map((item) => {
                    return <Class key={item.id_class} props={item}></Class>;
                })
            ) : (
                <h1 style={{margin: "15px"}}>Nenhuam turma adicionada!</h1>
            )}
        </div>
    );
};

export default ClassList;
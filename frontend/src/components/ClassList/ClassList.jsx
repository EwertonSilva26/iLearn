import React, { useState, useEffect } from "react";
import Class from "../Class/Class";
import { useContext } from "react";
import { ClassContext } from "../../context/Classprovider";
import axios from "axios";

// import { Link } from "react-router-dom";

let count = 0;
const ClassList = () => {
    // const { allClassesclasses } = useContext(ClassContext);
    const [error, setError] = useState("");
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        if (sessionStorage.getItem('token') !== null && count === 0) {
            count = 1;
            const id = JSON.parse(sessionStorage.getItem('token')).userId;

            axios
                .get("http://localhost:3003/classes/" + id)
                .then((response) => {
                    setClasses(response.data.result);
                })
                .catch((err) => {
                    console.log(`Erro ao buscar turmas ${err}`)
                    setError("Erro ao buscar turmas");
                });
        }
    });

    return (
        <div className="main">
            <h1 style={{ margin: "20px", fontSize: "25px" }}>Minhas turmas</h1>
            {classes.length > 0 ? (
                classes.map((item) => {
                    return <Class key={item.id_class} props={item}></Class>;
                })
            ) : (
                <h1>Nenhuam turma adicionada!</h1>
            )}
        </div>
    );
};

export default ClassList;
import React from "react";
import Class from "../Class/Class";
import { useContext } from "react";
import { ClassContext } from "../../context/Classprovider";
// import { Link } from "react-router-dom";

const ClassList = () => {
    const { classes } = useContext(ClassContext);

    return (
        <div className="main">
            <h1>Minhas turmas</h1>
            {classes.length > 0 ? (
                classes.map((item) => {
                    console.log("CLASSE: " + JSON.stringify(item))
                    return <Class key={item.id_class} props={item}></Class>;
                })
            ) : (
                <h1>Nenhuam turma adicionada!</h1>
            )}
        </div>
    );
};

export default ClassList;
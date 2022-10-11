import React, { useState, useEffect } from "react";
import Class from "../Class/Class";
import axios from "axios";
import swal from 'sweetalert';

let classCount = 0;
const ClassList = () => {
    const [classes, setClasses] = useState([]);

    let count = 0;

    useEffect(() => {
        if (classCount > 0) {
            return;
        }
        classCount++;

        axios
            .get(`http://localhost:3003/classes/${JSON.parse(sessionStorage.getItem('token')).userId}`)
            .then((response) => {
                setClasses(response.data.result[0]);
            })
            .catch((err) => {
                console.log(`Erro ao buscar turmas ${err}`)

                swal({
                    icon: "error",
                    title: "Não foi possivel buscar as suas turmas",
                    text: "Por favor clique para recarregar a pagina!",
                    button: {
                        text: "Recarregar"
                    }
                }).then(() => {
                    window.location.reload();
                });
            });
    });

    return (
        <div className="main">
            <h1 style={{ margin: "20px", marginTop: "60px", fontSize: "20px" }}>Minhas turmas</h1>
            {classes.length > 0 ? (
                classes.map((item) => {
                    item.itemTotal = 0;
                    count++;
                    if (count === (classes.length)) {
                        item.itemTotal = count;
                    }
                    return <Class key={item.id_class} props={item}></Class>;
                })
            ) : (
                <h1 style={{ margin: "15px" }}>Nenhuam turma adicionada!</h1>
            )}
        </div>
    );
};

export default ClassList;
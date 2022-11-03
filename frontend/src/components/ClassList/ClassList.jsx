import React, { useState, useEffect } from "react";
import Class from "../Class/Class";
import axios from "axios";
import swal from 'sweetalert';

import authentication from '../../authentication.js';

const ClassList = () => {

    if (authentication().isAuthenticated === false) {
        window.location.href = "http://localhost:3000/login";
    }

    const [classes, setClasses] = useState([]);
    const token = JSON.parse(sessionStorage.getItem('token'));
    let [classCount, setClassCount] = useState(0);
    let count = 0;

    useEffect(() => {
        if (classCount === 0) {
        
        axios
            .get(`http://localhost:3003/classes/${token.userId}`, {
                headers: {
                    'Authorization': token.token,
                },
            }).then((response) => {
                if (response.status === 200) {
                    setClasses(response.data.result[0]);
                } else if(response.status === 401) {
                    swal({
                        icon: "error",
                        title: "Não foi possivel buscar as suas turmas",
                        text: `Error ${response.message}`,
                        button: {
                            text: "Ok"
                        }
                    }).then(() => {
                        window.location.href = "http://localhost:3000/login";
                    });

                }
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

        }

        setClassCount(classCount+1);
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
import React from "react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ClassContext } from "../../context/Classprovider";

import "./AddQuestion.css";

const AddQuestion = ({ props }) => {

    return (
        <div className="main">
            <div id="classes">

                <h1>Adicione a questão</h1>
                <textarea></textarea>

                <h1>Adicione a Resposta</h1>
                <textarea></textarea>

                <button>Adicionar</button>

            </div>
        </div>
    );
};

export default AddQuestion;
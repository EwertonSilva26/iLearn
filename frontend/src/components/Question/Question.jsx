import React from "react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ClassContext } from "../../context/Classprovider";

import "./Question.css";

const Question = ({ props }) => {
    let number = 0;

    return (
        <div className="main">
            <div id="classes">
                <h1>{number + 1}</h1>
                <div id="btn_rigth">
                    <Link to={"/choice/"} className="card-link">
                    <button>Adicionar questão</button>
                    </Link>
                </div>
                <div id="paragraph">
                   <p></p>
                </div>
            </div>
        </div>
    );
};

export default Question;
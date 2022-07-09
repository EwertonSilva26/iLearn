import React from "react";
import { Link } from "react-router-dom";

import lamp from "./lamp.png";
import "./Question.css";

const Question = ({ props }) => {

    const showTip = () => {
        alert(``)
    }

    return (
        <div className="main_question_class">
            <div id="question_container">

                <div id="left_question">
                    <textarea id="txt_id" placeholder="Escreva seu codigo aqui" />
                </div>

                <div id="right_question">

                    <p id="p_question">Se listarmos todos os números naturais
                        abaixo de 10 que são múltiplos de 3 ou 5, obtemos 3, 5, 6 e 9.
                        A soma desses múltiplos é 23. Encontre a soma de todos os
                        múltiplos de 3 ou 5 abaixo de 1000.
                    </p>

                    <button onClick={showTip}>
                        <img src={lamp}></img>
                        <span className="tooltiptext">Clique para ter uma dica.</span>
                    </button>

                    <div id="btns_question">
                        <button>Enviar</button>
                        <button>Ver Feedback</button>
                    </div>
                </div>

            </div>
        </div >
    );

};

export default Question;
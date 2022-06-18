import React from "react";
import Question from "../Question/Question";
import { useContext } from "react";
import { QuestionContext } from "../../context/QuestionProvider";
// import { Link } from "react-router-dom";

const QuestionList = () => {
    const { questions } = useContext(QuestionContext);

    return (
        <div className="main">
            <h1>Questões</h1>
            {questions.length > 0 ? (
                questions.map((item) => {
                    return <Question key={item.id_question} props={item}></Question>;
                })
            ) : (
                <h1>Nenhuam questões adicionada para essa turma!</h1>
            )}
        </div>
    );
};

export default QuestionList;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const QuestionContext = React.createContext();

const QuestionProvider = (props) => {
  let [error, setError] = useState("");
  let [questions, setQuestions] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3003/questions")
      .then((response) => {
        setQuestions(response.data.result);
      })
      .catch((err) => {
        console.log(`Erro ao buscar questões ${err}`)
        setError("Erro ao buscar questões");
      });
  });

  return (
    <QuestionContext.Provider
      value={{
        questions: questions,
        error: error,
      }}
    >
      {props.children}
    </QuestionContext.Provider>
  );
};
export default QuestionProvider;
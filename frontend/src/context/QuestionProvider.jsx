import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import axios from "axios";

export const QuestionContext = React.createContext();

// let count = 0;
const QuestionProvider = (props) => {
  const [question, setQuestion] = useState([]);
  const [error, setError] = useState("");
  // let code = "";

  // const setParams = (params) => {
  //   code = params;
  // }

  // const { id_question } = useParams();

  // useEffect(() => {
  //   debugger
  //       axios
  //         .get(`http://localhost:3003/questions/p78ar6lt3`)
  //         .then((response) => {
  //           if (response.data.status === 200) {
  //             setQuestion(response.data.result);
  //             setError("");
  //           }
  //         })
  //         .catch((err) => {
  //           console.log(`Erro ao buscar questão ${err}`)
  //           setError("Erro ao buscar questão");
  //         });
  //     });


  return (
    <QuestionContext.Provider
      value={{
        // question: question,
        // error: error,
        // setParams: setParams
      }}
    >
      {props.children}
    </QuestionContext.Provider>
  );
};
export default QuestionProvider;
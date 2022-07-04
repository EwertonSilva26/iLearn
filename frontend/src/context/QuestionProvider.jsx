import React from "react";
// import axios from "axios";

export const QuestionContext = React.createContext();

// let count = 0;
// const initialValue = 1;
const QuestionProvider = (props) => {
  // const [questions, setQuestions] = useState([]);
  // const [error, setError] = useState("");
  // let code = "";

  // const setParams = (params) => {
  //   code = params;
  // }

  // useEffect(() => {
  //   if (code !== undefined && code !== "") {
  //     count += initialValue;
  //     if (count === initialValue) {
  //       axios
  //         .get(`http://localhost:3003/questions/${code}`)
  //         .then((response) => {
  //           if (response.data.status === 200) {
  //             setQuestions(response.data.result);
  //             setError("");
  //           }
  //         })
  //         .catch((err) => {
  //           console.log(`Erro ao buscar questões ${err}`)
  //           setError("Erro ao buscar questões");
  //         });
  //     }
  //   }
  // });


  return (
    <QuestionContext.Provider
      value={{
        // questions: questions,
        // error: error,
        // setParams: setParams
      }}
    >
      {props.children}
    </QuestionContext.Provider>
  );
};
export default QuestionProvider;
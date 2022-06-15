import React, { useState, useEffect } from "react";
import axios from "axios";

export const ClassContext = React.createContext();

const ClassProvider = (props) => {
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3003/classes")
      .then((response) => {
          // console.log("############# FRONTEND " + JSON.stringify(response.data))
          setClasses(response.data.result);
           console.log("############# FRONTEND " + classes[0])

      })
      .catch((err) => {
        console.log(`Erro ao buscar turmas ${err}`)
        setError("Erro ao buscar turmas");
      });
  });

  return (
    <ClassContext.Provider
      value={{
        classes: classes
      }}>
      {props.children}
    </ClassContext.Provider>
  );
};
export default ClassProvider;
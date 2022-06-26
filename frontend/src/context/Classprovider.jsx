import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const ClassContext = React.createContext();

const ClassProvider = (props) => {
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState("");
  
  const { id } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:3003/classes")
      .then((response) => {
          setClasses(response.data.result);
      })
      .catch((err) => {
        console.log(`Erro ao buscar turmas ${err}`)
        setError("Erro ao buscar turmas");
      });
  });

  return (
    <ClassContext.Provider
      value={{
        classes: classes,
        error: error
      }}>
      {props.children}
    </ClassContext.Provider>
  );
};
export default ClassProvider;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const HomeTeacherContext = React.createContext();

const HomeTeacherProvider = (props) => {
  let [error, setError] = React.useState("");
  let navigate = useNavigate();

  const createNewClass = (info) => {
    axios
      .post("http://localhost:3003/class/create", info)
      .then((response) => {
        if(response.data.status === 201) {
          // navigate("/login");
        } 
        else {
          setError("Erro ao criar a turma");
          console.log(`Não foi possivel criar a turma - ${JSON.stringify(response.data)}`)
        }
      })
      .catch((err) => {
        setError("Erro ao criar a turma");
      });
  }

  return (
    <HomeTeacherContext.Provider
      value={{
        createNewClass: createNewClass
      }}
    >
      {props.children}
    </HomeTeacherContext.Provider>
  );
};
export default HomeTeacherProvider;
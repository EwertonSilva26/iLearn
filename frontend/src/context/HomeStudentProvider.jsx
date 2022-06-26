import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const HomeStudentContext = React.createContext();

const HomeStudentProvider = (props) => {
  const id = JSON.parse(sessionStorage.getItem('token')).userId;
  const navigate = useNavigate();
  // const [error, setError] = React.useState("");

  const getClass = (classCode) => {

    const obj = {
      idStudent: id,
      classCode: classCode
    }
debugger
    axios
      .post("http://localhost:3003/student/classes", obj)
      .then((response) => {
        navigate("/classes/" + response.data.classCode);
      })
      .catch((err) => {
        navigate("/student/" + id);
        console.log("[ERROR]: " + JSON.stringify(err))
      });
  }

  return (
    <HomeStudentContext.Provider
      value={{
        getClass: getClass
      }}
    >
      {props.children}
    </HomeStudentContext.Provider>
  );
};
export default HomeStudentProvider;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const HomeStudentContext = React.createContext();

const HomeStudentProvider = (props) => {
  const navigate = useNavigate();
  // const [error, setError] = React.useState("");

  const insertClass = (classCode) => {
    const id = JSON.parse(sessionStorage.getItem('token')).userId;

    const obj = {
      idStudent: id,
      classCode: classCode
    }

    axios
      .post("http://localhost:3003/student/classes", obj)
      .then((response) => {
        console.log(response);
        navigate("/classes/");
      })
      .catch((err) => {
        navigate("/student/" + id);
        console.log("[ERROR]: " + JSON.stringify(err))
      });
  }

  return (
    <HomeStudentContext.Provider
      value={{
        insertClass: insertClass,
      }}
    >
      {props.children}
    </HomeStudentContext.Provider>
  );
};
export default HomeStudentProvider;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export const HomeStudentContext = React.createContext();

const HomeStudentProvider = (props) => {
  // let [error, setError] = React.useState("");
  const { id } = useParams();
  let navigate = useNavigate();

  const getClass = (classCode) => {
    debugger
    const obj = {
      idStudent: id,
      classCode: classCode
    }
    axios
      .post("http://localhost:3003/student/classes", obj)
      .then((response) => {
        navigate("/classes/" + response.data.id_class);
      })
      .catch((err) => {
        // navigate("/classes/" + response.data.id_class);
        console.log("[ERROR]: - " + JSON.stringify(err))
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
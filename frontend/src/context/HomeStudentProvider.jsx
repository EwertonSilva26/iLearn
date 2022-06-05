import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const HomeStudentContext = React.createContext();

const HomeStudentProvider = (props) => {
  // let [error, setError] = React.useState("");
  let navigate = useNavigate();

  const createClass = (info) => {
    axios
      .post("http://localhost:3003/login", info)
      .then((response) => {

      })
      .catch((err) => {
        // navigate("/login");
        console.log("[ERROR]: - " + JSON.stringify(err))
      });
  }

  return (
    <HomeStudentContext.Provider
      value={{
        createClass: createClass
      }}
    >
      {props.children}
    </HomeStudentContext.Provider>
  );
};
export default HomeStudentProvider;
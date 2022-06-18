import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const LoginContext = React.createContext();

const LoginProvider = (props) => {
  const [token, setToken] = useState(getAuthUser());
  let [error, setError] = React.useState("");
  let navigate = useNavigate();

  const loggin = (info) => {
    axios
      .post("http://localhost:3003/login", info)
      .then((response) => {
        if (response.data.status === 200) {
          authUser(response.data);
          setError("");

          let email = response.data.email;
          setTimeout(() => {
            if (email.includes("@professor")) {
              navigate("/teacher/" + response.data.id_user);
            } else if (email.includes("@aluno")) {
              navigate("/student/" + response.data.id_user);
            } else {
              console.log("locando como administrador");
              // navigate("/login");
            }
          }, 200);
        } else {
          console.log("erro - status: " + response.data.status);
        }
      })
      .catch((err) => {
        console.log("[ERROR]: - " + JSON.stringify(err))
      });
  }

  const authUser = (response) => {
    let data = {
      userId: response.id_user,
      email: response.email,
      token: response.token,
    };

    sessionStorage.setItem("token", JSON.stringify(data));
    setToken(token);
  };

  function getAuthUser() {
    const auth = sessionStorage.getItem("token");
    if (!auth) {
      return;
    }

    return JSON.parse(auth);
  }

  return (
    <LoginContext.Provider
      value={{
        token: token,
        error: error,
        authUser: authUser,
        loggin: loggin
      }}
    >
      {props.children}
    </LoginContext.Provider>
  );
};
export default LoginProvider;
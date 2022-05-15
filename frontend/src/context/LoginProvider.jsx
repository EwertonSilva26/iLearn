import React, { useState, useEffect } from "react";
import axios from "axios";

export const LoginContext = React.createContext();

const LoginProvider = (props) => {
  const [token, setToken] = useState(getAuthUser());

  const authUser = (token) => {
    let data = {
      auth: token.auth,
      user_id: token.user_id,
      user_name: token.user_name,
      email: token.email,
      token: token.token,
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

  useEffect(() => {
    axios
      .get("http://localhost:3003/")
      .then((response) => {})
      .catch((err) => {
        console.log(`Erro: ${err}`);
      });
  });

  return (
    <LoginContext.Provider
      value={{
        token: token,
        authUser: authUser,
      }}
    >
      {props.children}
    </LoginContext.Provider>
  );
};
export default LoginProvider;
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import "./Header.css";
import home from "./img/home.png";
import back from "./img/back.png";


function Header() {
  const [msg, setMsg] = useState("")
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();

  function logout() {
    if (token) {
      localStorage.removeItem("token");
    }

    navigate("/login");
  }

  useEffect(() => {
    if (token && (location.pathname.includes("/teacher/class/") &&
      location.pathname.includes("/add/question"))) {

      setMsg("Adicionar questão");

    }

  })

  return (
    <div>
      {token && ((!location.pathname.match("/login")) ||
        (!location.pathname.match("/"))) ? (

        <div className="header">
          {/* <div id="add_question">
            <p>{msg}</p>
          </div> */}

          <img src={back} id="back"></img>
          <img src={home} id="home"></img>

          <button id="leave" onClick={logout}>Sair</button>

        </div>
      ) : (
        <div className="header">
          <p id="welcome">Bem vindo</p>
        </div>

      )}
    </div>
  );
}

export default Header;
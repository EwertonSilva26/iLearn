import React from "react";
import { Form, Button, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

import "./Header.css";
import home from "./img/home.png";
import back from "./img/back.png";

const style = { marginRight: "10px" };

function Header() {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();

  function logout() {
    if (token) {
      sessionStorage.removeItem("token");
    }

    setTimeout(() => {
      navigate("/login");
    }, 100);
  }

  return (
    <div>
      {token && (!location.pathname.match("/login") ||
        !location.pathname.match("/")) ? (

        <div className="header">
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
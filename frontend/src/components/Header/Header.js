import React from "react";
import { Form, Button, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import { useContext } from "react";
// import { UfsContext } from "../../context/UfsProvider";
// import { NewContext } from "../../context/NewProvider";
import { LoginContext } from "../../context/LoginProvider";

import { useNavigate, useLocation } from "react-router-dom";

import "./Header.css";
import home from "./img/home.png";
import back from "./img/back.png";

const style = { marginRight: "10px" };

function Header() {
  const { token } = useContext(LoginContext);
//   const { ufs } = useContext(UfsContext);
//   const { selectUf } = useContext(NewContext);

  let navigate = useNavigate();
  let location = useLocation();

  function handleButton() {
    if (token) {
      sessionStorage.removeItem("token");
    }

    setTimeout(() => {
        navigate("/login");
    }, 100);
  }

  return (
    <div>
    {token && !location.pathname.match("/login") && (

      <div id="header">
        <img src={back} id="back"></img>
        <img src={home} id="home"></img>

        <button id="leave">Sair</button>



          {/* <Button variant="outline-info" onClick={handleButton}>
            {token && !location.pathname.match("/login") ? "Sair" : "Entrar"}
          </Button> */}
      </div>
      )}
      {/* {token && !location.pathname.match("/login") && <div className="user-info">Bem-vindo(a), {token.user_name}</div>} */}
    </div>
  );
}

export default Header;
import React from "react";
import { Form, Button, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import { useContext } from "react";
// import { UfsContext } from "../../context/UfsProvider";
// import { NewContext } from "../../context/NewProvider";
import { LoginContext } from "../../context/LoginProvider";

import { useNavigate, useLocation } from "react-router-dom";

import "./Footer.css";
import facebook from "./img/facebook.png";
import instagram from "./img/instagram.png";
import twitter from "./img/twitter.png";


const style = { marginRight: "10px" };

function Footer() {
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

        <div class="footer">
          <img src={facebook}></img>
          <img src={instagram}></img>
          <img src={twitter}></img>
          <p>Copyryght © - 2022 Ewerton Soares da Silva</p>
        </div>
        
      )}
      {/* {token && !location.pathname.match("/login") && <div className="user-info">Bem-vindo(a), {token.user_name}</div>} */}
    </div>
  );
}

export default Footer;
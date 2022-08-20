import React from "react";
import { Form, Button, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

import "./Footer.css";
import facebook from "./img/facebook.png";
import instagram from "./img/instagram.png";
import twitter from "./img/twitter.png";


const style = { marginRight: "10px" };

function Footer() {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();

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
      <div class="footer">
        <img src={facebook}></img>
        <img src={instagram}></img>
        <img src={twitter}></img>
        <p>Copyryght © - 2022 Ewerton Soares da Silva</p>
      </div>
    </div>
  );
}

export default Footer;
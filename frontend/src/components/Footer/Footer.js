import React from "react";

import "./Footer.css";
import facebook from "./img/facebook.png";
import instagram from "./img/instagram.png";
import twitter from "./img/twitter.png";


const style = { marginRight: "10px" };

function Footer() {
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
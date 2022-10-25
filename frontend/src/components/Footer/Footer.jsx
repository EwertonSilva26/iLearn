import React from "react";

import "./Footer.css";
import facebook from "./img/facebook.png";
import instagram from "./img/instagram.png";
import twitter from "./img/twitter.png";

function Footer() {
  return (
    <div>
      <div className="footer">
        <img src={facebook} alt="Icone Facebook"></img>
        <img src={instagram} alt="Icone Instagram"></img>
        <img src={twitter} alt="Icone Twitter"></img>
        <p>Copyryght © - 2022 Ewerton Soares da Silva</p>
      </div>
    </div>
  );
}

export default Footer;
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

import "./Header.css";
import home from "./img/home.png";
import back from "./img/back.png";


function Header() {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const navigate = useNavigate();
  const location = useLocation();
  const code  = window.location.href.split('/class/')[1];
  const localHost = "http://localhost:3000";

  function logout() {
    if (token) {
      sessionStorage.removeItem("token");
    }

    navigate("/login");
  }

  function backPreviewPage() {
    if (window.location.href ===
      `${localHost}/classes/student/${token.userId}`) {
      navigate(`/student/${token.userId}`);
    }

    if (window.location.href === `${localHost}/student/${token.userId}`) {
      window.location.reload(false);
    }

    if (window.location.href ===
      `${localHost}/questions/class/${token.userId}`) {
      navigate(`/student/${token.userId}`);
    }

    if(window.location.href === `${localHost}/questions/class/${code}`){
      navigate(`/student/${token.userId}`);
    }


  }

  function backHome() {
    if (token.email.includes("@aluno")) {
      navigate(`/student/${token.userId}`);
    } else {
      navigate(`/teacher/${token.userId}`);
    }
  }


  return (
    <div>
      {token && (!location.pathname.match("/login")) || (!location.pathname.match("/")) ? (

        <div className="header">

          <div id="images">
            <div id="img_buttons">
              <button onClick={backPreviewPage}>
                <img id="back" src={back}></img>
              </button>

              <button onClick={backHome}>
                <img id="home" src={home}></img>
              </button>
            </div>

            <p id="name">{token.email}</p>
          </div>
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
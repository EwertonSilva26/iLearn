import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

import "./Header.css";
import home from "./img/home.png";
import back from "./img/back.png";

function Header() {
  let actualLocation = window.location.href;
  const token = JSON.parse(sessionStorage.getItem("token"));
  const navigate = useNavigate();
  const location = useLocation();
  const localHost = "http://localhost:3000";

  function logout() {
    if (token) {
      sessionStorage.removeItem("token");
    }
    navigate("/login");
  }

  function backPreviewPage() {
    if (token.email.includes("@aluno")) {
      if (actualLocation === `${localHost}/student/${token.userId}`) {
        navigate(`/student/${token.userId}`);
        window.location.reload();
      }
      if (actualLocation === `${localHost}/classes/student/${token.userId}`) {
        navigate(`/student/${token.userId}`);
        window.location.reload();
      }

      if (actualLocation === `${localHost}/student/${token.userId}`) {
        window.location.reload(false);
      }

      if (actualLocation === `${localHost}/questions/class/${window.location.href.split('/class/')[1]}`) {
        navigate(`/classes/student/${token.userId}`);
        window.location.reload();
      }

      const urlSplit = window.location.href.split('/question/')[1].split('/');
      if (actualLocation === `${localHost}/question/${urlSplit[0]}/class/${urlSplit[2]}`) {
        navigate(`/questions/class/${urlSplit[2]}`);
        window.location.reload();
      }

    } else {
      if (actualLocation === `${localHost}/teacher/${token.userId}`) {
        navigate(`/teacher/${token.userId}`);
        window.location.reload();
      }

      if (actualLocation === `${localHost}/classes/teacher/${token.userId}`) {
        navigate(`/teacher/${token.userId}`);
        window.location.reload();
      }

      if (actualLocation === `${localHost}/questions/class/${window.location.href.split('/class/')[1]}`) {
        navigate(`/classes/teacher/${token.userId}`);
        window.location.reload();
      }

      let classCode = window.location.href.split("/class/")[1].split('/')[0];
      let questionCode = window.location.href.split("/class/")[1].split('/')[2];
      if (actualLocation === `${localHost}/class/${classCode}/question/${questionCode}/answers`) {
        navigate(`/questions/class/${classCode}`);
        window.location.reload();
      }
    }
  }

  function backHome() {
    if (token.email.includes("@aluno")) {
      window.location.href = `${localHost}/student/${token.userId}`
    } else {
      window.location.href = `${localHost}/teacher/${token.userId}`
    }
  }

  return (
    <div>
      {token && (!location.pathname.match("/login")) ||
        (!location.pathname.match("/")) ? (

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

            <button id="leave" onClick={logout}>Sair</button>
            <h1 id="name" style={{ marginRight: token.email.length >= 30 ? "45px" : "15px" }}>{token.email}</h1>

            <p id="welcome" style={{ marginTop: "-43px", fontSize: "25px" }}>iLearn</p>
          </div>

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
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(getAuthUser());
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loggin = (info) => {
    axios
      .post("http://localhost:3003/login", info)
      .then((response) => {
        if (response.data.status === 200) {
          authUser(response.data);
          setError("");

          let email = response.data.email;
          setTimeout(() => {
            if (email.includes("@professor")) {
              navigate("/teacher/" + response.data.id_user);
            } else if (email.includes("@aluno")) {
              navigate("/student/" + response.data.id_user);
            } else {
              console.log("logando como administrador");
              // navigate("/login");
            }
          }, 200);
        }
      })
      .catch((err) => {
        console.log("[Erro]: " + JSON.stringify(err));
        navigate("/login");
        setError("Login ou senha invalido!");
      });
  }

  const registerUser = (request) => {
    axios
      .post("http://localhost:3003/create/user", request)
      .then((response) => {
        console.log(JSON.stringify(response.data))
        navigate("/home");
      })
      .catch((err) => {
        console.log("[ERROR]: - " + JSON.stringify(err))
      });
  }

  const authUser = (response) => {
    let data = {
      userId: response.id_user,
      email: response.email,
      token: response.token,
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

  function handleSubmit(event) {
    event.preventDefault();

    const userInfo = {
      email: event.target[0].value,
      password: event.target[1].value
    }

    loggin(userInfo);
  }


  function createUser() {
    // event.preventDefault();
    console.log("Botão funcionando")

  }

  return (
    <div className="containerLogin">

      <div className="left">
        <h1 id="title_h1">iLearn</h1>
        <p id="p_login"> iLearn é uma ferramenta desenvolvida com o intuito de ajudar os alunos
          iniciantes em programação a melhorar sua lógica e escrita de algoritimos.
        </p>

        <div className="study">
          <img src="https://cdn.pixabay.com/photo/2017/10/08/19/52/i-am-a-student-2831334_960_720.png" alt="img_livro_formatura" />
        </div>
      </div>

      <div className="right">
        <Form onSubmit={handleSubmit}>
          <div id="enter">
            <h1 className="title_h1">Entrar</h1>
          </div>

          <Form.Group size="lg" controlId="email">
            <Form.Control className="ipt_label" autoFocus type="email" value={email} placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group id="pwd_group" size="lg" controlId="password">
            <Form.Control id="password" className="ipt_label" type="password" value={password} placeholder="Senha" onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          {error ? (
            <span className="error-message" style={{ display: "block" }}>{error}</span>
          ) : (
            <span className="error-message" style={{ display: "none" }}>{error}</span>
          )}

          <button className="btn_login" block size="lg" type="submit">
            Login
          </button>
        </Form>

        <div className="register">
          <button id="btn_register" onClick={createUser}>FAÇA SEU CADASTRO</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
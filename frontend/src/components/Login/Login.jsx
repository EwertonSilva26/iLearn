import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import swal from 'sweetalert';

import graduation from "./img/graduation.png";

import "./Login.css";

function Login() {
  const [name, setName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState(getAuthUser());
  const [error, setError] = useState("");
  const [modalIdResgister, setModalIdRegister] = useState("");
  let request = {};

  let containErrors = 0;

  const navigate = useNavigate();

  // Função para fazer login do usuario 
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

  // Função para fazer cadastro do usuario 
  const createUser = (event) => {
    event.preventDefault();

    if (verifyPassword(password)) {
      return;
    }

    request = {
      email: name.replace(" ", '').toLowerCase()
        .concat(lastName.replace(" ", '').toLowerCase())
        .concat(uuidv4().replaceAll('-', '').substring(0, 5))
        .concat('@aluno.com'),
      password: password,
      name: name,
      middleName: middleName,
      lastName: lastName
    };

    axios
      .post("http://localhost:3003/create/user", request)
      .then((response) => {

        if (response.data.status === 201) {

          swal({
            icon: "success",
            title: "Usuário cadastrado!",
            text: `Seu e-mail ${request.email}`,
            button: {
              text: "Fechar"
            }
          }).then(() => {
            let info = {
              email: request.email,
              password: request.password
            }
  
            loggin(info);
        });
        }
      })
      .catch((err) => {
        console.log(err);
        message("error", "Usuário não cadastrado!", `Tente novamente!`);
      });
  }

  const verifyPassword = (password) => {
    if (password !== confirmPassword) {
      setError("*As senhas são incompatíveis!");
      containErrors++;

      setPassword("");
      setConfirmPassword("");
      
      message("error", "senhas são incompatíveis!", `Tente novamente!`);

    }

    return containErrors > 0;
  }

  function message(icon, title, text) {
    swal({
      icon: icon,
      title: title,
      text: text,
      button: {
        text: "Fechar"
      }
    })
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

  function closeResgisterModal() {
    if (modalIdResgister !== "") {
      setModalIdRegister("");
      setError("");
      cleanAllFields()
    }

  }

  function cleanAllFields() {
    setName("");
    setMiddleName("");
    setLastName("");
    setPassword("");
    setConfirmPassword("");
  }

  function openModal() {
    setModalIdRegister("modal_id_register");
  }

  return (
    <div className="containerLogin">

      {/* Modal */}
      <div id={modalIdResgister} className="modalRegister">
        <div className="modal-content_register">
          <span className="registerClose" onClick={closeResgisterModal}>&times;</span>
          <p className="pMessage">Faça seu cadastro!</p>

          {error ? (
            <span className="errorMessage" style={{ display: "block" }}>
              {error}
            </span>
          ) : (
            <span className="errorMessage" style={{ display: "none" }}>
              {error}
            </span>
          )}

          <Form onSubmit={createUser} style={{ marginLeft: "-10px" }}>
            <Form.Group size="lg">
              <Form.Control required id="register_name" className="register_ipt"
                autoFocus type="text" value={name}
                placeholder="Digite seu nome"
                onChange={(e) => setName(e.target.value)} />
            </Form.Group>

            <Form.Group id="middleName" size="lg" >
              <Form.Control required id="middle_name" className="register_ipt"
                type="text" value={middleName}
                placeholder="Digite o segundo nome"
                onChange={(e) => setMiddleName(e.target.value)} />
            </Form.Group>

            <Form.Group id="lastName" size="lg">
              <Form.Control required id="last_name" className="register_ipt"
                type="text" value={lastName}
                placeholder="Digite o ultimo nome"
                onChange={(e) => setLastName(e.target.value)} />
            </Form.Group>

            <Form.Group id="userPassword" size="lg">
              <Form.Control required id="user_password" className="register_ipt"
                type="password" value={password}
                placeholder="Digite uma senha"
                onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>

            <Form.Group id="confirmPassword" size="lg" >
              <Form.Control required id="confirm_password" className="register_ipt"
                type="password" value={confirmPassword}
                placeholder="Confirmar senha"
                onChange={(e) => setConfirmPassword(e.target.value)} />
            </Form.Group>

            <button className="btn_register" block size="lg" type="submit">
              Cadastrar
            </button>

          </Form>
        </div>
      </div>

      <div className="left">
        <h1 id="title_h1">iLearn</h1>
        <p id="p_login"> iLearn é uma ferramenta desenvolvida com o intuito de ajudar os alunos
          iniciantes em programação a melhorar sua lógica e escrita de algoritimos.
        </p>

        <div className="study">
          <img src={graduation} alt="img_livro_formatura" />
        </div>
      </div>

      <div className="right">
        <Form onSubmit={handleSubmit}>
          <div id="enter">
            <h1 className="title_h1">Entrar</h1>
          </div>

          <Form.Group size="lg">
            <Form.Control className="ipt_label" autoFocus type="email"
              value={email} placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group id="pwd_group" size="lg">
            <Form.Control id="password" className="ipt_label" type="password"
              value={password} placeholder="Senha"
              onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          {error ? (
            <span className="error-message" style={{ display: "block" }}>
              {error}
            </span>
          ) : (
            <span className="error-message" style={{ display: "none" }}>
              {error}
            </span>
          )}

          <button className="btn_login" block size="lg" type="submit">
            Login
          </button>
        </Form>

        <div className="register">
          <button id="btn_register" onClick={openModal}>FAÇA SEU CADASTRO</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
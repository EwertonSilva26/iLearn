import React from "react";
import { Form, Button } from "react-bootstrap";

import "./Login.css";
import axios from "axios";
import { useContext } from "react";
import { LoginContext } from "../../context/LoginProvider";

import { useNavigate } from "react-router-dom";

function Login() {
  const { authUser } = useContext(LoginContext);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  let [error, setError] = React.useState("");

  let navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    const object = {
      email: event.target[0].value,
      password: event.target[1].value,
    };

    axios
      .post("http://localhost:3003/login", object)
      .then((response) => {
        if (response.status === 200) {
          authUser(response.data);
          setError("");

          setTimeout(() => {
            navigate("/login");
          }, 200);
        } else {
          console.log("erro");
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  }

  return (
    <div className="container">

      <div className="introduction">
        <h1>iLearn</h1>
        <p> iLearn é uma ferramenta desenvolvida com o intuito de ajudar os alunos
          iniciantes em programação a melhorar sua escrita de algoritimos.</p>

          <div className="think">
            <img src="https://cdn.pixabay.com/photo/2017/10/08/19/52/i-am-a-student-2831334_960_720.png" alt="pessoa pensando"></img>

          </div>
      </div>

      <div className="login">
        <Form onSubmit={handleSubmit}>
          <div>
            <h1>Entrar</h1>
            <span>Já estou cadastrado</span>
          </div>
          <Form.Group size="lg" controlId="email">
            <Form.Control className="inputLabel" autoFocus type="email" value={email} placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Control className="inputLabel" type="password" value={password} placeholder="Senha" onChange={(e) => setPassword(e.target.value)} />
            <span className="error-message">{error}</span>
          </Form.Group>

          <Button className="loginButton" block size="lg" type="submit">
            Login
          </Button>

          <div className="register">
            <Button className="registerButton" block size="lg" type="submit">
              FAÇA SEU CADASTRO
            </Button>
          </div>

        </Form>
      </div>

      {/* <div className="register">


      </div> */}
    </div>
  );
}

export default Login;
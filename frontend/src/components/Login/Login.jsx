import React from "react";
import { Form, Button } from "react-bootstrap";

import "./Login.css";
import { useContext } from "react";
import { LoginContext } from "../../context/LoginProvider";

function Login() {
  const { loggin, error } = useContext(LoginContext);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleSubmit(event) {
    event.preventDefault();


    const userInfo = {
      email: event.target[0].value, 
      password: event.target[1].value 
    }
    
    loggin(userInfo);
    
  }
  
  return (
    <div className="container">

      <div className="left">
        <h1>iLearn</h1>
        <p> iLearn é uma ferramenta desenvolvida com o intuito de ajudar os alunos
          iniciantes em programação a melhorar sua lógica e escrita de algoritimos.
        </p>

        <div className="study">
          <img src="https://cdn.pixabay.com/photo/2017/10/08/19/52/i-am-a-student-2831334_960_720.png" alt="img_livro_formatura" />
        </div>
      </div>

      <div className="right">
        <Form onSubmit={handleSubmit}>
          <div>
            <h1>Entrar</h1>
            <span>Já estou cadastrado</span>
          </div>

          <Form.Group size="lg" controlId="email">
            <Form.Control className="ipt_label" autoFocus type="email" value={email} placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group size="lg" controlId="password">
            <Form.Control className="ipt_label" type="password" value={password} placeholder="Senha" onChange={(e) => setPassword(e.target.value)} />
            <span className="error-message">{error}</span>
          </Form.Group>

          <Button className="btn_login" block size="lg" type="submit">
            Login
          </Button>
        </Form>

        <div className="register">
          <Button className="btn_register" block size="lg" type="submit">
            FAÇA SEU CADASTRO
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
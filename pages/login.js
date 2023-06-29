import Pagina from "@/components/Pagina";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";

const index = () => {
 // Cria vareaveis 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/login", {
        //Converter em json string
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        router.push("/filmes");
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setError("Ocorreu um erro ao fazer login.");
    }
  };

  return (
    <>
      <Pagina>
        <div>
          <Card>
            <Card.Body>
              <Card.Title>Login</Card.Title>
              <Form onSubmit={handleLogin}>
                <Form.Group controlId="email">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>Senha:</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                {error && <p>{error}</p>}
                <Button variant="primary" type="submit">
                  Entrar
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Pagina>
    </>
  );
};

export default index;

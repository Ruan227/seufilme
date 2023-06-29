import Pagina from "@/components/Pagina";
import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useRouter } from "next/router";

export default function Cadastro() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleCadastro = async () => {
    if (!email || !password) {
      setMessage("Todos os campos são obrigatórios.");
      return;
    }

    try {
      const response = await fetch("/api/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.message);
      }

      if (response.ok) {
        setMessage(data.message);
        router.push("/login");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Erro ao criar conta:", error);
      setMessage("Ocorreu um erro ao criar a conta.");
    }
  };

  return (
    <>
      <div>
        <Pagina titulo="Cadastro">
          <div>
            <Card>
              <Card.Body>
                <Card.Title>Cadastro de Cliente</Card.Title>
                <Form>
                  <Form.Group controlId="formEmail">
                    <Form.Label>E-mail:</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Insira o seu e-mail..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="formPassword">
                    <Form.Label>Senha:</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Insira a sua senha..."
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>

                  <Button variant="primary" onClick={handleCadastro}>
                    Cadastrar
                  </Button>
                </Form>
              </Card.Body>
            </Card>
            {message && (
              <p>
                <strong>{message}</strong>
              </p>
            )}
          </div>
        </Pagina>
      </div>
    </>
  );
}

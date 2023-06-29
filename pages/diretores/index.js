import Pagina from "@/components/Pagina";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { AiFillPlusCircle } from "react-icons/ai";
import { BsFillTrashFill, BsPencil } from "react-icons/bs";

const index = () => {
  const [diretores, setDiretores] = useState([]);

  useEffect(() => {
    getAll();
  }, []);

  function getAll() {
    axios.get("/api/diretores").then((resultado) => {
      setDiretores(resultado.data);
    });
  }

  function excluir(id) {
    if (confirm("Deseja realmente excluir?")) {
      axios.delete("/api/diretores/" + id);
      getAll();
    }
  }

  return (
    <>
      <Pagina titulo="Diretores Cadastrados">
        <Row md={4}>
          {diretores.map((item) => (
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>{item.nome}</Card.Title>
                  <br />
                  <p>
                    <strong>Estúdio: </strong>
                    {item.estudio}
                  </p>
                  <p>
                    <strong>Filmes: </strong>
                    {item.filme}
                  </p>
                  <p>
                    <strong>Data de nascimento: </strong>
                    {item.data}
                  </p>
                  <div className="text-center">
                    <Button
                      title="Alterar"
                      className="btn btn-primary me-2"
                      href={"/diretores/" + item.id}
                    >
                      <BsPencil title="Alterar" />
                    </Button>
                    <Button
                      title="Excluir"
                      className="btn btn-danger"
                      onClick={() => excluir(item.id)}
                    >
                      <BsFillTrashFill title="Excluir" />
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Link href="/diretores/form/" className="btn btn-success">
          <AiFillPlusCircle /> Adicionar Diretores
        </Link>
      </Pagina>
    </>
  );
};

export default index;

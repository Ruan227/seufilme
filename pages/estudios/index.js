import Pagina from "@/components/Pagina";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { AiFillPlusCircle } from "react-icons/ai";
import { BsFillTrashFill, BsPencil } from "react-icons/bs";

const index = () => {
  const [estudios, setEstudios] = useState([]);

  useEffect(() => {
    getAll();
  }, []);

  function getAll() {
    axios.get("/api/estudios").then((resultado) => {
      setEstudios(resultado.data);
    });
  }

  function excluir(id) {
    if (confirm("Deseja realmente excluir?")) {
      axios.delete("/api/estudios/" + id);
      getAll();
    }
  }

  return (
    <>
      <Pagina titulo="Estúdios Cadastrados">
        <Row md={4}>
          {estudios.map((item) => (
            <Col>
              <Card>
                <Card.Body>
                  <Card.Img variant="top" src={item.urlImagem}></Card.Img>
                  <Card.Title>{item.nome}</Card.Title>
                  <br />
                  <p>
                    <strong>Nome: </strong>
                    {item.nome}
                  </p>
                  <p>
                    <strong>País: </strong>
                    {item.pais}
                  </p>
                  <p>
                    <strong>Descrição: </strong>
                    {item.descricao}
                  </p>
                  <p>
                    <strong>Ano de Fundação: </strong>
                    {item.ano}
                  </p>
                  <div className="text-center">
                    <Button
                      title="Alterar"
                      className="btn btn-primary me-2"
                      href={"/estudios/" + item.id}
                    >
                      <BsPencil title="Alterar" />
                    </Button>
                    <Button title="Excluir" className="btn btn-danger">
                      <BsFillTrashFill
                        title="Excluir"
                        onClick={() => excluir(item.id)}
                      />
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Link href="/estudios/form/" className="btn btn-success">
          <AiFillPlusCircle /> Adicionar Estúdio
        </Link>
      </Pagina>
    </>
  );
};

export default index;

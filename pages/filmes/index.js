import Pagina from "@/components/Pagina";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { BsFillTrashFill, BsPencil } from "react-icons/bs";
import { AiFillPlusCircle } from "react-icons/ai";

const Index = () => {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    getAll();
  }, []);

  function getAll() {
    axios.get("/api/filmes").then((resultado) => {
      setFilmes(resultado.data);
    });
  }

  function excluir(id) {
    if (confirm("Deseja realmente excluir?")) {
      axios.delete("/api/filmes/" + id).then(() => {
        getAll();
      });
    }
  }

  return (
    <>
      <Pagina titulo="Filmes Cadastrados">
        <Row md={4}>
          {filmes.map((item) => (
            <Col key={item.id}>
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
                    <strong>Sinopse: </strong>
                    {item.sinopse}
                  </p>
                  <p>
                    <strong>Duração: </strong>
                    {item.duracao}
                  </p>
                  <p>
                    <strong>Faixa Etária: </strong>
                    {item.etaria}
                  </p>
                  <div className="text-center">
                    <Button
                      title="Alterar"
                      className="btn btn-primary me-2"
                      href={"/filmes/" + item.id}
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
        <Link href="/filmes/form" className="btn btn-success">
          <AiFillPlusCircle /> Adicionar Filme
        </Link>
      </Pagina>
    </>
  );
};

export default Index;

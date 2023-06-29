import Pagina from "@/components/Pagina";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { AiFillPlusCircle } from "react-icons/ai";
import { BsFillTrashFill, BsPencil } from "react-icons/bs";

const index = () => {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    getAll();
  }, []);

  function getAll() {
    axios.get("/api/series").then((resultado) => {
      setSeries(resultado.data);
    });
  }

  function excluir(id) {
    if (confirm("Deseja realmente excluir?")) {
      axios.delete("/api/series/" + id);
      getAll();
    }
  }

  return (
    <>
      <Pagina titulo="Series Cadastrados">
        <Row md={4}>
          {series.map((item) => (
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
                    <strong>Gênero: </strong>
                    {item.genero}
                  </p>
                  <p>
                    <strong>Duração: </strong>
                    {item.temporadas}
                  </p>
                  <p>
                    <strong>Faixa Etária: </strong>
                    {item.etaria}
                  </p>
                  <p>
                    <strong>Gênero: </strong>
                    {item.genero}
                  </p>
                  <div className="text-center">
                    <Button
                      title="Alterar"
                      className="btn btn-primary me-2"
                      href={"/series/" + item.id}
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
        <Link href="/series/form/" className="btn btn-success">
          <AiFillPlusCircle /> Adicionar Series
        </Link>
      </Pagina>
    </>
  );
};

export default index;

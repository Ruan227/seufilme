import Pagina from "@/components/Pagina";
import avaliacaoValidator from "@/validators/avaliacaoValidator";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { BiSend, BiArrowBack } from "react-icons/bi";

const form = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { push, query } = useRouter();

  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    if (query.id) {
      axios.get("/api/avaliacoes/" + query.id).then((resultado) => {
        console.log(resultado.data);

        const avaliacoes = resultado.data;
        for (let atributo in avaliacoes) {
          setValue(atributo, avaliacoes[atributo]);
        }
      });
    }
  }, [query.id]);

  function salvar(dados) {
    axios.put("/api/avaliacoes/" + query.id, dados);
    push("/avaliacoes");
  }

  function getAll() {
    axios.get("/api/filmes").then((resultado) => {
      setFilmes(resultado.data);
    });
  }

  useEffect(() => {
    getAll();
  }, []);

  return (
    <>
      <Pagina>
        <Form>
          <Form.Group className="mb-3" controlId="filme">
            <Form.Label>
              <strong>Filme: (Selecione)</strong>
            </Form.Label>
            <Form.Select
              size="lg"
              {...register("filme", avaliacaoValidator.filme)}
            >
              {filmes.map((item) => (
                <option>{item.nome}</option>
              ))}
            </Form.Select>
            {errors.filme && (
              <small className="error-message bg-danger text-white">
                {errors.filme.message}
              </small>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="nome">
            <Form.Label>
              <strong>Nome: </strong>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite seu nome..."
              {...register("nome", avaliacaoValidator.nome)}
            />
            {errors.nome && (
              <small className="error-message bg-danger text-white">
                {errors.nome.message}
              </small>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="avaliacao">
            <Form.Label>
              <strong>Avaliação: </strong>
            </Form.Label>
            <Form.Select
              size="lg"
              {...register("avaliacao", avaliacaoValidator.avaliacao)}
            >
              <option>1/5</option>
              <option>2/5</option>
              <option>3/5</option>
              <option>4/5</option>
              <option>5/5</option>
            </Form.Select>
            {errors.avaliacao && (
              <small className="error-message bg-danger text-white">
                {errors.avaliacao.message}
              </small>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="comentario">
            <Form.Label>
              <strong>Comentário: </strong>
            </Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Digite o seu comentário..."
              {...register("comentario", avaliacaoValidator.comentario)}
            />
            {errors.comentario && (
              <small className="error-message bg-danger text-white">
                {errors.comentario.message}
              </small>
            )}
          </Form.Group>
        </Form>

        <div className="text-center">
          <Button
            className="ms-2 mt-4 btn btn-success"
            type="submit"
            onClick={handleSubmit(salvar)}
          >
            <BiSend className="me-2" /> Salvar
          </Button>
          <Button
            href="/avaliacoes"
            className="ms-2 mt-4 btn btn-danger"
            type="submit"
          >
            <BiArrowBack className="me-2" /> Voltar
          </Button>
        </div>
      </Pagina>
    </>
  );
};

export default form;

import Pagina from "@/components/Pagina";
import diretorValidator from "@/validators/diretorValidator";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { BiSend, BiArrowBack } from "react-icons/bi";
import { mask } from "remask";

const form = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { push } = useRouter();

  function salvar(dados) {
    axios.post("/api/diretores", dados);
    push("/diretores");
  }

  function handleChange(event) {
    const name = event.target.name;
    const valor = event.target.value;
    const mascara = event.target.getAttribute("mask");
    setValue(name, mask(valor, mascara));
  }

  return (
    <>
      <Pagina>
        <Form>
          <Form.Group className="mb-3" controlId="nome">
            <Form.Label>
              <strong>Nome: </strong>
            </Form.Label>
            <Form.Control
              isInvalid={errors.nome}
              type="text"
              placeholder="Digite o nome do filme..."
              {...register("nome", diretorValidator.nome)}
            />
            {errors.nome && (
              <small className="error-message bg-danger text-white">
                {errors.nome.message}
              </small>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="estudio">
            <Form.Label>
              <strong>Estúdio: (Selecione)</strong>
            </Form.Label>
            <Form.Control
              isInvalid={errors.estudio}
              type="text"
              {...register("estudio", diretorValidator.estudio)}
            />
            {errors.estudio && (
              <small className="error-message bg-danger text-white">
                {errors.estudio.message}
              </small>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="data">
            <Form.Label>
              <strong>Data de nascimento: (Selecione) </strong>
            </Form.Label>
            <Form.Control
              isInvalid={errors.datanascimento}
              type="date"
              placeholder="Selecione a data..."
              {...register("data", diretorValidator.datanascimento)}
            />
            {errors.datanascimento && (
              <small className="error-message bg-danger text-white">
                {errors.datanascimento.message}
              </small>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="filmes">
            <Form.Label>
              <strong>Filmes: </strong>
            </Form.Label>
            <Form.Control
              mask="9"
              isInvalid={errors.filmes}
              type="text"
              placeholder="Digite a quantidade de filmes..."
              {...register("filmes", diretorValidator.filme)}
              onChange={handleChange}
            />
            {errors.filmes && (
              <small className="error-message bg-danger text-white">
                {errors.filmes.message}
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
            href="/diretores"
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

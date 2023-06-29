import Pagina from "@/components/Pagina";
import filmeValidator from "@/validators/filmeValidator";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { BiSend, BiArrowBack } from "react-icons/bi";
import { mask } from "remask";

const FormPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { push } = useRouter();

  function salvar(dados) {
    axios.post("/api/filmes", dados);
    push("/filmes");
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
          <Form.Group className="mb-3" controlId="imagem">
            <Form.Label>
              <strong>Imagem: </strong>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite a URL da imagem do Filme..."
              {...register("urlImagem")}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="nome">
            <Form.Label>
              <strong>Nome: </strong>
            </Form.Label>
            <Form.Control
              isInvalid={errors.nome}
              type="text"
              placeholder="Digite o nome do filme..."
              {...register("nome", filmeValidator.nome)}
            />
            {errors.nome && (
              <small className="error-message bg-danger text-white">
                {errors.nome.message}
              </small>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="sinopse">
            <Form.Label>
              <strong>Sinopse: </strong>
            </Form.Label>
            <Form.Control
              isInvalid={errors.sinopse}
              type="text"
              placeholder="Digite a sinopse do filme..."
              {...register("sinopse", filmeValidator.sinopse)}
            />
            {errors.sinopse && (
              <small className="error-message bg-danger text-white">
                {errors.sinopse.message}
              </small>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="duracao">
            <Form.Label>
              <strong>Duração: </strong>
            </Form.Label>
            <Form.Control
              mask="99:99"
              isInvalid={errors.duracao}
              type="time"
              placeholder="Digite a duração do filme..."
              {...register("duracao", filmeValidator.duracao)}
              onChange={handleChange}
            />
            {errors.duracao && (
              <small className="error-message bg-danger text-white">
                {errors.duracao.message}
              </small>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="etaria">
            <Form.Label>
              <strong>Faixa Etária: </strong>
            </Form.Label>
            <Form.Control
              mask="99"
              isInvalid={errors.etaria}
              type="text"
              placeholder="Digite a faixa etária do filme..."
              {...register("etaria", filmeValidator.etaria)}
              onChange={handleChange}
            />
            {errors.etaria && (
              <small className="error-message bg-danger text-white">
                {errors.etaria.message}
              </small>
            )}
          </Form.Group>
          <div className="text-center">
            <Button
              className="ms-2 mt-4 btn btn-success"
              type="submit"
              onClick={handleSubmit(salvar)}
            >
              <BiSend className="me-2" /> Salvar
            </Button>
            <Button
              href="/filmes"
              className="ms-2 mt-4 btn btn-danger"
              type="submit"
            >
              <BiArrowBack className="me-2" /> Voltar
            </Button>
          </div>
        </Form>
      </Pagina>
    </>
  );
};

export default FormPage;

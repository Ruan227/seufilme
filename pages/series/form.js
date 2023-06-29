import Pagina from "@/components/Pagina";
import serieValidator from "@/validators/serieValidator";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { BiSend, BiArrowBack } from "react-icons/bi";
import { mask } from "remask";

const Formulario = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { push } = useRouter();

  function salvar(dados) {
    axios.post("/api/series", dados);
    push("/series");
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
              placeholder="Digite o nome da série..."
              {...register("nome", serieValidator.nome)}
            />
            {errors.nome && (
              <small className="error-message bg-danger text-white">
                {errors.nome.message}
              </small>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="imagem">
            <Form.Label>
              <strong>Imagem: </strong>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite a URL da imagem da série..."
              {...register("urlImagem")}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="genero">
            <Form.Label>
              <strong>Gênero:</strong>
            </Form.Label>
            <Form.Check
              type="checkbox"
              aria-label="checkbox"
              value="Aventura"
              label="Aventura"
              {...register("genero")}
            />
            <br></br>
            <Form.Check
              type="checkbox"
              aria-label="checkbox"
              value="Ação"
              label="Ação"
              {...register("genero")}
            />
            <br></br>
            <Form.Check
              type="checkbox"
              aria-label="checkbox"
              value="Comédia"
              label="Comédia"
              {...register("genero")}
            />
            <br></br>
            <Form.Check
              type="checkbox"
              aria-label="checkbox"
              value="Romance"
              label="Romance"
              {...register("genero")}
            />
            <br></br>
            <Form.Check
              type="checkbox"
              aria-label="checkbox"
              value="Drama"
              label="Drama"
              {...register("genero")}
            />
            <br></br>
            <Form.Check
              type="checkbox"
              aria-label="checkbox"
              value="Suspense"
              label="Suspense"
              {...register("genero")}
            />
            <br></br>
          </Form.Group>

          <Form.Group className="mb-3" controlId="temporadas">
            <Form.Label>
              <strong>Temporadas: </strong>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite a quantidade de temporadas da série..."
              {...register("temporadas", serieValidator.temporadas)}
            />
            {errors.temporadas && (
              <small className="error-message bg-danger text-white">
                {errors.temporadas.message}
              </small>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="etaria">
            <Form.Label>
              <strong>Faixa Etária: </strong>
            </Form.Label>
            <Form.Control
              isInvalid={errors.etaria}
              type="text"
              placeholder="Digite a faixa etária da série..."
              {...register("etaria", serieValidator.etaria)}
            />
            {errors.etaria && (
              <small className="error-message bg-danger text-white">
                {errors.etaria.message}
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

          <Link href="/series" className="ms-2 mt-4 btn btn-danger">
            <BiArrowBack className="me-2" /> Voltar
          </Link>
        </div>
      </Pagina>
    </>
  );
};

export default Formulario;

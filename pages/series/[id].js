import Pagina from "@/components/Pagina";
import serieValidator from "@/validators/serieValidator";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { BiSend, BiArrowBack } from "react-icons/bi";
import { mask } from "remask";
const form = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { push, query } = useRouter();

  function handleChange(event) {
    const name = event.target.name;
    const valor = event.target.value;
    const mascara = event.target.getAttribute("mask");
    setValue(name, mask(valor, mascara));
  }
  useEffect(() => {
    if (query.id) {
      axios.get("/api/series/" + query.id).then((resultado) => {
        console.log(resultado.data);

        const serie = resultado.data;

        for (let atributo in serie) {
          setValue(atributo, serie[atributo]);
        }
      });
    }
  }, [query.id]);

  function salvar(dados) {
    axios.put("/api/series/" + query.id, dados);
    push("/series");
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
              placeholder="Digite a url da imagem da série..."
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
              value="Aventura | "
              label="Aventura"
              {...register("genero")}
            />
            <Form.Check
              type="checkbox"
              aria-label="checkbox"
              value="Ação |"
              label="Ação"
              {...register("genero")}
            />
            <Form.Check
              type="checkbox"
              aria-label="checkbox"
              value="Comédia |"
              label="Comédia"
              {...register("genero")}
            />
            <Form.Check
              type="checkbox"
              aria-label="checkbox"
              value="Romance |"
              label="Romance"
              {...register("genero")}
            />
            <Form.Check
              type="checkbox"
              aria-label="checkbox"
              value="Drama |"
              label="Drama"
              {...register("genero")}
            />
            <Form.Check
              type="checkbox"
              aria-label="checkbox"
              value="Suspense |"
              label="Suspense"
              {...register("genero")}
            />
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
              mask="99"
              type="text"
              placeholder="Digite a faixa etária da série..."
              {...register("etaria", serieValidator.etaria)}
              onChange={handleChange}
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
          <Button
            href="/series"
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

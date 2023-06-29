import Pagina from '@/components/Pagina';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import { BiSend, BiArrowBack } from "react-icons/bi";
import estudioValidator from "@/validators/estudioValidator";

const form = () => {

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();
  const { push, query } = useRouter();

  useEffect(() => {
    if (query.id) {
      axios.get("/api/estudios/" + query.id).then((resultado) => {
        console.log(resultado.data);

        const estudio = resultado.data;

        for (let atributo in estudio) {
          setValue(atributo, estudio[atributo]);
        }
      });
    }
  }, [query.id]);

  function salvar(dados) {
    axios.put("/api/estudios/" + query.id, dados);
    push("/estudios");
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
              placeholder="Digite o nome do estúdio.."
              {...register("nome", estudioValidator.nome)}
            />
            {errors.nome && (
              <small className="error-message bg-danger text-white">
                {errors.nome.message}
              </small>
            )}
            
          </Form.Group>

          <Form.Group className="mb-3" controlId="pais">
            <Form.Label>
              <strong>País: </strong>
            </Form.Label>
            <Form.Control
              isInvalid={errors.pais}
              type="text"
              placeholder="Digite o país do estúdio..."
              {...register("pais", estudioValidator.pais)}
            />
            {errors.pais && (
              <small className="error-message bg-danger text-white">
                {errors.pais.message}
              </small>
            )}
          </Form.Group>
            <Form.Group className="mb-3" controlId="descricao">
              <Form.Label>
                <strong>Descrição: </strong>
              </Form.Label>
              <Form.Control
                isInvalid={errors.descricao}
                as="textarea"
                placeholder="Digite a descrição do estúdio..."
                {...register("descricao", estudioValidator.descricao)}
              />
              {errors.descricao && (
              <small className="error-message bg-danger text-white">
                {errors.descricao.message}
              </small>
            )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="ano">
            <Form.Label>
              <strong>Data de Fundação: </strong>
            </Form.Label>
            <Form.Control
              isInvalid={errors.data}
              type="date"
              placeholder="Selecione a data de fundação do estúdio..."
              {...register("ano", estudioValidator.data)}
            />
            {errors.data && (
              <small className="error-message bg-danger text-white">
                {errors.data.message}
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
            href="/estudios"
            className="ms-2 mt-4 btn btn-danger"
            type="submit"
          >
            <BiArrowBack className="me-2" /> Voltar
          </Button>
        </div>
      </Pagina>
    </>
  )
}

export default form
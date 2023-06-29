import React from "react";
import Cabecalho from "./Cabecalho";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

const Pagina = (props) => {
  return (
    <>
      <Cabecalho />
      <div className='text-center text-white py-2 bg-secondary' >
        <h3>{props.titulo}</h3>
      </div>
      <br></br>
      <Container>{props.children}</Container>
      <Container/>
    </>
  );
};

export default Pagina;
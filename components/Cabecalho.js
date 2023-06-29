import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import Link from "next/link";

const Cabecalho = () => {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/filmes">Pagina Inicial</Navbar.Brand>
                    <Nav className="ms-auto">
                        <Nav.Link href="/filmes">Filmes</Nav.Link>
                        <Nav.Link href="/series">Séries</Nav.Link>
                        <Nav.Link href="/diretores">Diretores</Nav.Link>
                        <Nav.Link href="/estudios">Estúdios</Nav.Link>
                        <Nav.Link href="/avaliacoes">Avaliações</Nav.Link>
                        <Link href="/login" >
                        </Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
};

export default Cabecalho;
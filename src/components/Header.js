import React from 'react';

import { LinkContainer } from 'react-router-bootstrap';
import { Container, Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';


export default function Header(props) {
	return (
		<>
		<Navbar 
			fixed="top" 
			style={{position: "sticky"}} 
			collapseOnSelect 
			expand="md"
			variant="light"
			bg="light">
			<Container fluid>
					<LinkContainer to="/">
						<Navbar.Brand>Стереометрия ЕГЭ</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />

					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="me-auto">
							<NavDropdown title="Справка">
								<NavDropdown.Item href="https://github.com/ts-vadim/math-tests-archive">Редактировать Задачи</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href="#">Сообщить об ошибке</NavDropdown.Item>
								<NavDropdown.Item href="#">Репозиторий проекта</NavDropdown.Item>
							</NavDropdown>
						</Nav>
						
						<Button variant="light">
							<i className="bi bi-moon" />
						</Button>
					</Navbar.Collapse>

			</Container>
		</Navbar>
		</>
	);
}

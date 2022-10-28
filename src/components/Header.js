import React, { memo } from 'react';

import { LinkContainer } from 'react-router-bootstrap';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';


function Header(props) {
	const ARCHIVE_URL = "https://github.com/nkg-17/math-tests-archive";
	const REPO_URL = "https://github.com/nkg-17/math-tests";

	return (
		<Navbar 
			fixed="top" 
			style={{position: "sticky"}} 
			collapseOnSelect 
			expand="md"
			variant="light">
			<Container fluid>
					<LinkContainer to="/">
						<Navbar.Brand>&ensp;Стереометрия ЕГЭ</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />

					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="me-auto">
							<NavDropdown title="Справка">
								<NavDropdown.Item href={ARCHIVE_URL}>Редактировать Задачи</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href={REPO_URL}>Репозиторий проекта</NavDropdown.Item>
							</NavDropdown>
						</Nav>
					</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default memo(Header);
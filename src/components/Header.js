import React, { memo } from 'react';

import { LinkContainer } from 'react-router-bootstrap';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import ThemeSwitch from './ThemeSwitch';


function Header(props) {
	const ARCHIVE_URL = "https://github.com/nkg-17/math-tests-archive";
	const ISSUES_URL = "https://github.com/nkg-17/math-tests/issues/new";
	const REPO_URL = "https://github.com/nkg-17/math-tests";

	return (
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
								<NavDropdown.Item href={ARCHIVE_URL}>Редактировать Задачи</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href={ISSUES_URL}>Сообщить об ошибке</NavDropdown.Item>
								<NavDropdown.Item href={REPO_URL}>Репозиторий проекта</NavDropdown.Item>
							</NavDropdown>
						</Nav>
						<ThemeSwitch />
					</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default memo(Header);
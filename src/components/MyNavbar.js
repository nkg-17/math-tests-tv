import './MyNavbar.css';

import React from "react";

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';


class MyNavbar extends React.Component {
	render() {
		return (
			<Navbar style={{position: "sticky"}} fixed="top" bg="light" expand="lg">
				<Container fluid>
					<Navbar.Brand href="#">Стереометрия ЕГЭ</Navbar.Brand>
					<Navbar.Toggle aria-controls="navbar-collapse-contents" />
					<Navbar.Collapse id="navbar-collapse-contents">
						<Nav className="me-auto">
							<NavDropdown title="Справка" id="navbar-collapse-dropdown">
								<NavDropdown.Item href="#">Редактировать Задачи</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href="#">Репозиторий проекта</NavDropdown.Item>
								<NavDropdown.Item href="#">Сообщить об ошибке</NavDropdown.Item>
							</NavDropdown>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		);
	}
}

export default MyNavbar;

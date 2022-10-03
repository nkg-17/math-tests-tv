
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Navbar, Nav, NavDropdown,  Button } from 'react-bootstrap';


export default function Header(props) {
	const theme = (props.theme) ? props.theme : "light";

	return (
		<>
		<Navbar 
			fixed="top" 
			style={{position: "sticky"}} 
			collapseOnSelect 
			expand="md" 
			bg={theme}
			variant={theme}>
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
								<NavDropdown.Item href="https://github.com/ts-vadim/math-tests-school-project/issues/new?assignees=ts-vadim&labels=bug-report&template=BugReport.md&title=">Сообщить об ошибке</NavDropdown.Item>
								<NavDropdown.Item href="https://github.com/nkg-17/math-tests">Репозиторий проекта</NavDropdown.Item>
							</NavDropdown>
						</Nav>
						<Button variant={theme}>
							<i className="bi bi-moon"/>
						</Button>
					</Navbar.Collapse>
			</Container>
		</Navbar>
		</>
	);
}


import './TestView.css';

import { Container, Row, Col, Button, Form } from 'react-bootstrap';


function TestView(props) {
	const ISSUES_URL = "https://github.com/nkg-17/math-tests/issues/new";

	return (
		<>
			<Container fluid style={{ color: "var(--bs-gray)"}}>
				<h5>{props.test.title}</h5>
			</Container>
			<Container fluid className="TestView">

				<Container className="ProblemContainerHeader p-0 mb-2 d-flex flex-row justify-content-end">
					<a href={ISSUES_URL} className="ReportLink" target="_blank" rel="noopener noreferrer">
						<i className="bi bi-exclamation-circle" />
						&thinsp;Сообщить об ошибке
					</a>
				</Container>

				<Container className="ProblemContainer">
					{props.test.problem.text}<br />
					{props.test.problem.text}<br />
					{props.test.problem.text}<br />
					{props.test.problem.text}<br />
					{props.test.problem.text}<br />
					{props.test.problem.text}<br />
					{props.test.problem.text}<br />
					{props.test.problem.text}<br />
					{props.test.problem.text}<br />
					{props.test.problem.text}<br />
					{props.test.problem.text}<br />
					{props.test.problem.text}<br />
				</Container>

				<Container className="ProblemFooter mt-3 px-5 d-flex justify-content-end">
					<Row className="gx-3">
						<Col className="col-auto">
							<Form.Control className="rounded-mid" placeholder="Ответ" />
						</Col>
						<Col className="col-auto">
							<Button variant="success" className="rounded-mid">Проверить</Button>
						</Col>
					</Row>
				</Container>
				
			</Container>

			<Button 
			variant="light" 
			className="TestSwipeButton"
			style={{ left: "15rem" }}>
				<i className="bi bi-caret-left" />
			</Button>
			<Button 
			variant="light" 
			className="TestSwipeButton"
			style={{ right: "15rem" }}>
				<i className="bi bi-caret-right" />
			</Button>
		</>
	);
}

export default TestView;
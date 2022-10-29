
import './TestView.css';

import { Container, Row, Col, Button, Form } from 'react-bootstrap';


function TestView(props) {
	return (
		<Container fluid>
			<TestHeader test={props.test} />
			<TestBody 	test={props.test} />
			<TestFooter test={props.test} />
		</Container>
	);
}

export default TestView;


function TestHeader(props) {
	return (
		<Row className="TestHeaderdebug-outline pb-5">
			<Col>
				<div className="TestHeader">
					<h5>{props.test.title}</h5>
				</div>
			</Col>
		</Row>
	);
}

function TestBody(props) {
	return (
		<Row className="d-flex justify-content-center debug-outline">
			<TestBodySwipeButton direction="left" />

			<TestBodyProblem test={props.test} />

			<TestBodySwipeButton direction="right" />
		</Row>
	);
}

function TestFooter(props) {
	return (
		<Row className="debug-outline">
			<Col>
				<Container className="TestFooter mt-4 py-3 px-5 d-flex justify-content-end">
					<Row className="gx-3">
						<Col className="col-auto">
							<Form.Control placeholder={props.test.problem.answer.placeholder} />
						</Col>
						<Col className="col-auto">
							<Button variant="success">Проверить</Button>
						</Col>
					</Row>
				</Container>
			</Col>
		</Row>
	);
}

function TestBodySwipeButton(props) {
	return (
		<Col className="col-auto d-flex flex-column justify-content-center debug-outline">
			<SwipeButton direction={props.direction} />
		</Col>
	);
}

function TestBodyProblem(props) {
	return (
		<Col className="col-auto debug-outline">
			<Container className="TestTextContainer px-4 py-3">
				&emsp;{props.test.problem.text}
			</Container>
		</Col>
	);
}

function SwipeButton(props) {
	const style = {
		transform: `rotate(${(props.direction === "left" ? 180 : 0)}deg)`
	};

	return (
		<Button 
		variant="light">
			<img 
			src={`arrow-right.svg`} 
			style={style}
			alt=""/>
		</Button>
	);
}

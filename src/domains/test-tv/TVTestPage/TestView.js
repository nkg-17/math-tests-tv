
import './TestView.css';

import ColorPalette from '../../../constants/ColorPalette';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';


function TestView(props) {
	const onTestChange = props.onTestChange ?? ((shift)=>{});

	return (
		<Container fluid>
			<TestHeader test={props.test} />
			<TestBody 	test={props.test} onTestChange={onTestChange} />
			<TestFooter test={props.test} />
		</Container>
	);
}

export default TestView;


function TestHeader(props) {
	return (
		<Row className="TestHeaderdebug-outline pt-5 pb-5">
			<Col>
				<div className="TestHeader">
					<h2 style={{color: ColorPalette.textPrimary}}>{props.test.title}</h2>
				</div>
			</Col>
		</Row>
	);
}

function TestBody(props) {
	return (
		<Row className="d-flex justify-content-center debug-outline">
			<TestBodySwipeButton direction="left" onClick={() => props.onTestChange(-1)} />
			<TestBodyProblem test={props.test} />
			<TestBodySwipeButton direction="right" onClick={() => props.onTestChange(1)} />
		</Row>
	);
}

function TestFooter(props) {
	return (
		<Row className="debug-outline">
			<Col>
				<Container 
				className="TestFooter py-3 px-5 d-flex justify-content-end"
				style={{backgroundColor: ColorPalette.secondary}}>
					<Row className="gx-3">
						<Col className="col-auto">
							<Form.Control size="lg" placeholder={props.test.problem.answer.placeholder} />
						</Col>
						<Col className="col-auto">
							<Button size="lg" variant="success">Проверить</Button>
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
			<SwipeButton direction={props.direction} onClick={props.onClick} />
		</Col>
	);
}

function TestBodyProblem(props) {
	return (
		<Col className="col-auto debug-outline">
			<Container 
			className="TestTextContainer px-4 py-3"
			style={{backgroundColor: ColorPalette.secondary, color: ColorPalette.textSecondary}}>
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
		variant={ColorPalette.button}>
			<img
			src={`arrow-right.svg`} 
			style={style}
			alt=""
			onClick={props.onClick}/>
		</Button>
	);
}

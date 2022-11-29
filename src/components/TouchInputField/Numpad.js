// import React, { useState, useRef, useEffect, useContext } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';

// import TouchInputFieldContext from './TouchInputFieldContext';


function Numpad(props) {
	return (
		<Container fluid>
			<Row className="g-2">
				<Col><Button variant="dark">1</Button></Col>
				<Col><Button variant="dark">2</Button></Col>
				<Col><Button variant="dark">3</Button></Col>
			</Row>
			<Row className="g-2">
				<Col><Button variant="dark">4</Button></Col>
				<Col><Button variant="dark">5</Button></Col>
				<Col><Button variant="dark">6</Button></Col>
			</Row>
			<Row className="g-2">
				<Col><Button variant="dark">7</Button></Col>
				<Col><Button variant="dark">8</Button></Col>
				<Col><Button variant="dark">9</Button></Col>
			</Row>
			<Row className="g-2">
				<Col><Button variant="dark">0</Button></Col>
			</Row>
		</Container>
	);
}

export default Numpad;
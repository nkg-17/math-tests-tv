import './TestPage.css'
import logo from './logo.png'

import { LinkContainer } from 'react-router-bootstrap';
import React from 'react';
import {
	Container,
	Row,
	Col,
	Button
} from 'react-bootstrap';


export default function TestPage(props) {
	return (
		<Container className="TestPage py-3">
			<Row className="">
				<Col>
					<Container className="TestProblemPanel p-2 border d-flex flex-column justify-content-between">
						<Container className="">
							<h3>Title</h3>
							<Container>
								Sample text Sample text Sample text Sample text Sample text Sample text Sample text Sample text Sample text Sample text Sample text Sample text Sample text Sample text Sample text Sample text Sample text Sample text Sample text Sample text Sample text Sample text Sample text Sample text Sample text Sample text Sample text 
							</Container>
						</Container>
						<Row className="d-flex flex-row justify-content-start">
							<Col><LinkContainer to="/"><Button variant="outline-secondary">Back</Button></LinkContainer></Col>
							<Col><Button variant="success">Submit</Button></Col>
						</Row>
					</Container>
				</Col>
				<Col>
					<Container className="TestPicturePanel p-2 border">
						<img src={logo} className="TestPicture" alt="" />
					</Container>
				</Col>
			</Row>
		</Container>
	);
}

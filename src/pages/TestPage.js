import './TestPage.css'

import { LinkContainer } from 'react-router-bootstrap';
import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import {
	Container,
	Row,
	Col,
	Button,
	Alert
} from 'react-bootstrap';
import TestsAPI from '../api/TestsAPI';


export default function TestPage(props) {
	const params = useParams();
	const [ { status, data }, setTestInfo ] = useState(
		{ status: 'loading', data: null }
	);

	if (data === null) {
		const request = TestsAPI.requestTestInfo(params.id);
		request.then((info) => { setTestInfo({ status: 'loaded', data: info }); });
		request.catch((error) => { setTestInfo({ status: 'failed', data: error }); });
	}

	if (status === 'loaded') {
		return (
			<Container className="TestPage py-3">
				<Row className="gy-2">
					<Col md={6} sm={12}>
						<Container className="TestProblemPanel p-2 border d-flex flex-column justify-content-between">
							<Container className="">
								<h3>{data.name}</h3>
								<Container>{data.problem.preface}</Container>
							</Container>
							<Row className="d-flex flex-row justify-content-start">
								<Col><LinkContainer to="/"><Button variant="outline-secondary">Back</Button></LinkContainer></Col>
								<Col><Button variant="success">Submit</Button></Col>
							</Row>
						</Container>
					</Col>
					<Col md={6} sm={12}>
						<Container className="TestPicturePanel p-2 border">
							<img src={data.problem.pictureUrl} className="TestPicture" alt="" />
						</Container>
					</Col>
				</Row>
			</Container>
		);
	} else if (status === 'loading') {
		return (
			<Container className="TestPage py-3">
				Loading...
			</Container>
		);
	} else {
		return (
			<Container className="TestPage py-3">
				<Alert variant="danger">
					<Alert.Heading>Тест под номером {params.id} не существует!</Alert.Heading>
					{ /*<p>
					</p>
					<hr />
					<p>
					</p> */ }
				</Alert>
			</Container>
		);
	}
	
}

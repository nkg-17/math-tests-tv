import './TestPage.css'

import { LinkContainer } from 'react-router-bootstrap';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import {
	Container,
	Row,
	Col,
	Button
} from 'react-bootstrap';
import TestsAPI from '../api/TestsAPI';


export default function TestPage(props) {
	const params = useParams();
	const [ testInfo, setTestInfo ] = useState(null);

	useEffect(
		() => {
			let request = TestsAPI.requestTestInfo(params.id);
			request.then((info) => { setTestInfo(info); })
			request.catch((error) => { setTestInfo(null); });
			return ()=>{};
		}
	);

	// icons: star, star-fill, bookmark, bookmark-fill, fullscreen, fullscreen-exit

	if (testInfo !== null) {
		return (
			<Container className="TestPage py-3">
				<Row className="gy-2">
					<Col md={6} sm={12}>
						<Container className="TestProblemPanel p-2 border d-flex flex-column justify-content-between">
							<h1>{testInfo.name}</h1>
						</Container>
						<div className="w-100 mt-2 d-flex flex-row justify-content-between">
							<Button variant="light"><i className="bi bi-fullscreen" /></Button>
							<LinkContainer to={ "/" }><Button variant="outline-secondary">Следующая задача</Button></LinkContainer>
						</div>
					</Col>
					<Col md={6} sm={12}>
						<Container className="TestPicturePanel p-2 border">
							<img src={testInfo.problem.pictureUrl} className="TestPicture" alt="" />
						</Container>
					</Col>
				</Row>
			</Container>
		);
	} else {
		return (
			<Container className="TestPage py-3">
				<Row className="gy-2">
					<Col md={6} sm={12}>
						<Container className="TestProblemPanel p-2 border d-flex flex-column justify-content-between">
							Loading...
						</Container>
						<div className="w-100 mt-2 d-flex flex-row justify-content-between">
							<Button variant="light"><i className="bi bi-fullscreen" /></Button>
							<LinkContainer to={ "/" }><Button variant="outline-secondary">Следующая задача</Button></LinkContainer>
						</div>
					</Col>
					<Col md={6} sm={12}>
						<Container className="TestPicturePanel p-2 border">
						</Container>
					</Col>
				</Row>
			</Container>
		);
	}
	
}

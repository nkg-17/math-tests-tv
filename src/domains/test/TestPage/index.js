import { useParams } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import TestsAPI from '../../../api/TestsAPI';
import Status from '../../../common/Status';

import Loading from '../../../components/Loading';
import Warning from '../../../components/Warning';


export default function TestPage(props) {

	function loadRandomTest() {
		TestsAPI.requestRandomId(
		).then(
			(nextId) => TestsAPI.requestTest(nextId)
		).then(
			(newTest) => {
				test.current = newTest;
				console.log(newTest.id);
				error.current = null;
				setStatus(Status.Ok);
			}
		).catch(
			(reqError) => {
				error.current = reqError;
				setStatus(Status.Failed);
			}
		);
	}

	const params = useParams();
	let test	= useRef(null);
	let error	= useRef(null);
	const [ status, setStatus ] = useState(Status.Waiting);

	useEffect(loadRandomTest, [params.id]);

	if (status === Status.Ok) {
		return (
			<Container className="TestLayout">
				<Row className="h-100 d-flex flex-column justify-content-between">
					<Col className="">
						<Container style={{textAlign: "left"}}>
							<h4>Условие</h4>
							<p>{test.current.id} {test.current.problem.text}</p>
						</Container>
					</Col>
					<Col className="col-auto">
						<Row className="d-flex flex-row justify-content-start">
							<Col className="col-auto ms-auto">
								<Button 
								variant="outline-secondary">
									Следующая задача
								</Button>
							</Col>
						</Row>
					</Col>
				</Row>
			</Container>
		);
	}
	else if (status === Status.Failed) {
		return (<Container><Warning heading="Ошибка" text={error.current.toString()}/></Container>);
	}
	else {
		return (<div className="mt-auto mb-auto"><Loading /></div>);
	}
}

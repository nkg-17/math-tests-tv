import './TestPage.css'

import { LinkContainer } from 'react-router-bootstrap';
import { useParams, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import {
	Container,
	Row,
	Col,
	Button,
	Nav,
	Form
} from 'react-bootstrap';
import TestsAPI from '../api/TestsAPI';


class Status {
	static Ok 		= 0;
	static Waiting 	= 1;
	static Failed 	= 2;
};



export default function TestPage(props) {
	const params = useParams();
	const [ state, setState ] = useState({
		status: Status.Waiting, 
		testInfo: null,
		tabIndex: 0,
		solutionOpened: false
	});
	const tabComponents = {
		0: ProblemTab,
		1: ErrorTab,
		2: SolutionTab
	}

	function ProblemTab(index) {
		return (
			<div>
				<p>{state.testInfo.problem.preface}</p>
				<ol>
				{
					state.testInfo.problem.tasks.map((task, i) => { return (
						<li key={i}>
							<b>{task.title}</b>
							<p>{task.text}</p>
						</li>
					); })
				}
				</ol>
				<Container fluid className="my-2">
					<Row className="d-flex flex-row gx-2 gy-1">
						<Col className="col-auto">
							<Form>
								<Form.Control type="text" placeholder="">
								</Form.Control>
							</Form>
						</Col>
						<Col className="col-auto">
							<Button variant="success" onClick={() => { openSolution(); }}>Ответить</Button>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
	function SolutionTab(index) {
		return (
			<div>
				<p>{state.testInfo.solution.preface}</p>
				<ul>
				{
					state.testInfo.solution.tasks.map((task, i) => { return (
						<li key={i}>{task.text}</li>
					); })
				}
				</ul>
			</div>
		);
	}
	function ErrorTab(index) {
		return (
			<div>
				Tab {index}
			</div>
		);
	}

	function selectTab(tabIndex) {
		setState( (state) => { return { ...state, tabIndex: tabIndex }; } );
	}

	function openSolution() {
		setState( (state) => { return { ...state, tabIndex: 2, solutionOpened: true }; } );
	}

	useEffect(
		() => {
			let request = TestsAPI.requestTestInfo(params.id);
			request.then(
				(info) => { setState( (state) => { return { ...state, status: Status.Ok, testInfo: info }; } ); },
				(error) => { setState( (state) => { return { ...state, status: Status.Failed, testInfo: null}; } ); }
			);
			return ()=>{};
		}, [params.id]
	);

	if (state.status === Status.Ok) {
		return (
			<Container className="TestPage py-3">
				<Row className="mb-1">
					<Col md={6} sm={12}>
						<Nav justify variant="pills" activeKey={state.tabIndex} onSelect={selectTab}>
							<Nav.Item><Nav.Link eventKey={0}>Условие</Nav.Link></Nav.Item>
							<Nav.Item><Nav.Link eventKey={1}>Подсказки</Nav.Link></Nav.Item>
							<Nav.Item><Nav.Link eventKey={2} disabled={!state.solutionOpened}>Решение</Nav.Link></Nav.Item>
						</Nav>
					</Col>
					<Col></Col>
				</Row>
				<Row className="gy-2">
					<Col md={6} sm={12}>
						<Container className="TestProblemPanel p-2 border">
							<Container fluid className="TestProblemHeader d-flex flex-row justify-content-between">
								<h2>{state.testInfo.name}</h2>
								<i className={"bi " + (state.testInfo.starred ? "bi-star-fill" : "")} style={{color: "gold", fontSize: "1.25rem"}} />
							</Container>
							<div className="TestProblemBody mx-1 overflow-auto">
								{ tabComponents[state.tabIndex](state.tabIndex) }
							</div>
						</Container>

						<div className="w-100 py-2 d-flex flex-row justify-content-between">
							<Button variant="light"><i className="bi bi-fullscreen" /></Button>
							<LinkContainer to={ "/" }><Button variant="outline-secondary">Следующая задача</Button></LinkContainer>
						</div>
					</Col>
					<Col md={6} sm={12}>
						<Container className="TestPicturePanel p-2 border">
							<img src={state.testInfo.problem.pictureUrl} className="TestPicture" alt="" />
						</Container>
					</Col>
				</Row>
			</Container>
		);
	} else if (state.status === Status.Failed) {
		return (<Navigate to="/404" />);
	} else {
		return (
			<Container className="TestPage py-3">
				<Row className="gy-2">
					<Col md={6} sm={12}>
						<Container className="TestProblemPanel p-2 border d-flex flex-column justify-content-between">
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

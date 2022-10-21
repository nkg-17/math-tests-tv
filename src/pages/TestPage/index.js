import './index.css'

import { useParams, Navigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import {
	Container
} from 'react-bootstrap';

import TestsAPI from '../../api/TestsAPI';
import Status from '../../common/Status';

import Loading from '../../components/Loading';

import TestLayout from './TestLayout';


export default function TestPage(props) {
	const params = useParams();

	let test = useRef(null);
	let error = useRef(null);

	const [ status, setStatus ] = useState(Status.Waiting);

	useEffect(
		() => {
			let request = TestsAPI.requestTestInfo(params.id);
			request.then(
				(reqTestData) => {
					test.current = reqTestData;
					error.current = null;
					setStatus(Status.Ok);
				},
				(reqError) => {
					error.current = reqError;
					setStatus(Status.Failed);
				}
			);
			return ()=>{};
		},
		[params.id]
	);

	if (status === Status.Ok) {
		return (
			<Container className="py-3">
				<TestLayout test={test.current} />
			</Container>
		);
	}
	else if (status === Status.Failed) {
		return (
			<Navigate to="/404" />
		);
	}
	else {
		return (
			<Container className="py-3">
				<Loading />
			</Container>
		);
	}

	/*
	const params = useParams();
	const [ state, setState ] = useState({
		status: Status.Waiting, 
		testInfo: null,
		tabIndex: 0,
		solutionOpened: false
	});

	useEffect(
		() => {
			let request = TestsAPI.requestTestInfo(params.id);
			request.then(
				(info) => {
					setState((state) => {
						return { ...state, status: Status.Ok, testInfo: info };
					});
				},
				(error) => {
					setState((state) => {
						return { ...state, status: Status.Failed, testInfo: null };
					});
				}
			);
			return ()=>{};
		}, [params.id]
	);

	if (state.status === Status.Ok) {
		return (
			<Container className="py-3">
				<Row className="mb-1 d-flex flex-row justify-content-start">
					<Col md={6} sm={12}> <TestNavTabs /> </Col>
				</Row>
				<Row className="gy-2">
					<Col md={6} sm={12}> <ProblemPanel test={test} tabId={tabId}/> </Col>
					<Col md={6} sm={12}> <PicturePanel test={test} tabId={tabId}/> </Col>
				</Row>
			</Container>
		);
	} else if (state.status === Status.Failed) {
		return (<Navigate to="/404" />);
	} else {
	*/
}

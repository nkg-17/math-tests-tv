import React, { useState, useEffect, useRef } from 'react';
import { Container } from 'react-bootstrap';

import TestsAPI from '../../../api/TestsAPI';
import Status from '../../../common/Status';

import Loading from '../../../components/Loading';
import Warning from '../../../components/Warning';

import TestView from './TestView';


export default function TVTestPage(props) {

	function loadRandomTest() {
		TestsAPI.requestRandomId(
		).then(
			(nextId) => TestsAPI.requestTest(nextId)
		).then(
			(newTest) => {
				test.current = newTest;
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

	function loadTestWithShift(shift) {
		if (status === Status.Waiting)
			return;

		const idReq = (shift > 0) 
			? TestsAPI.requestNextIdFor(test.current.id) 
			: TestsAPI.requestPrevIdFor(test.current.id);

		idReq.then(
			(nextId) => TestsAPI.requestTest(nextId)
		).then(
			(newTest) => {
				test.current = newTest;
				error.current = null;
				setStatus(Status.Ok);
			}
		).catch(
			(reqError) => {
				error.current = reqError;
				setStatus(Status.Failed);
			}
		);

		setStatus(Status.Waiting);
	}

	let test	= useRef(null);
	let error	= useRef(null);
	const [ status, setStatus ] = useState(Status.Waiting);

	useEffect(loadRandomTest, []);

	switch (status) {
		case Status.Ok:
			return (<TestView test={test.current} onTestChange={loadTestWithShift}/>);

		case Status.Failed:
			return (<Container><Warning heading="Ошибка" text={error.current.toString()}/></Container>);

		default:
			return (<div className="mt-auto mb-auto"><Loading /></div>);
	}
}

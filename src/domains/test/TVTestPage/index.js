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

	let test	= useRef(null);
	let error	= useRef(null);
	const [ status, setStatus ] = useState(Status.Waiting);

	useEffect(loadRandomTest, []);

	switch (status) {
		case Status.Ok:
			return (<TestView test={test.current}/>);

		case Status.Failed:
			return (<Container><Warning heading="Ошибка" text={error.current.toString()}/></Container>);

		default:
			return (<div className="mt-auto mb-auto"><Loading /></div>);
	}
}

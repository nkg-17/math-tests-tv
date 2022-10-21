import React, { useState, useEffect, useRef } from 'react';

import {
	Container
} from 'react-bootstrap';

import TestsAPI from 	'../../api/TestsAPI';
import Status from 		'../../common/Status';

import Warning from 	'../../components/Warning';
import Loading from 	'../../components/Loading';

import TestSearchForm from 	'./TestSearchForm'
import TestPreviewList from './TestPreviewList';


export default function CatalogPage() {
	const [ tests, setTests ] = useState(null);
	let status = useRef(Status.Waiting);
	let error = useRef(null);

	useEffect(
		() => {
			TestsAPI.requestTestList().then(
				(list) => { 
					status.current = Status.Ok;
					setTests(list);
				},
				(err) => {
					status.current = Status.Failed;
					error.current = err;
					console.log(`Failed to fetch test list`);
					console.error(err);
					setTests(null);
				}
			);
			return () => {};
		}, []
	);

	return (
		<Container className="mt-3">
				{
					(() => {
						switch (status.current) {
							case Status.Ok:
								return (
									<>
										<TestSearchForm />
										<TestPreviewList tests={tests} />
									</>
								);

							case Status.Failed:
								return (
									<Warning 
									heading="Ошибка" 
									text={error.current.toString()} />
								);

							case Status.Waiting:
								return (
									<Loading />
								);

							default:
								console.error("unreachable code");
						}
					})()
				}
		</Container>
	);
}

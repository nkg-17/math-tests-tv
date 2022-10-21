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
	const [ status, setStatus ] = useState(Status.Waiting);
	let error = useRef(null);
	let tests = useRef(null);

	useEffect(
		() => {
			TestsAPI.requestTestList().then(
				(list) => { 
					tests.current = list;
					error.current = null;
					setStatus(Status.Ok);
				},
				(err) => {
					tests.current = null;
					error.current = err;
					setStatus(Status.Failed);
				}
			);
			return () => {};
		}, []
	);

	return (
		<Container className="mt-3">
				{
					(() => {
						switch (status) {
							case Status.Ok:
								return (
									<>
										<TestSearchForm />
										<TestPreviewList tests={tests.current} />
									</>
								);

							case Status.Failed:
								return (
									<Warning 
									heading="Ошибка" 
									text={error.current.toString()}
									description="Откройте Консоль в Инструментах разработчика (Ctrl+Shift+I) чтобы увидеть подробности." />
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

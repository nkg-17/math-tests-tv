import './CatalogPage.css';

import React, { useState, useEffect } from 'react';
import {
	Container,
	Row,
	Col,
	Spinner,
	Alert
} from 'react-bootstrap';
import TestsAPI from '../api/TestsAPI';
import Status from '../common/Status';

import SearchBar from '../components/SearchBar';
import NamedDropdown from '../components/NamedDropdown';
import TestPreviewList from '../components/TestPreviewList';


export default function CatalogPage() {
	const [ state, setState ] = useState({ testList: null, status: Status.Waiting });

	useEffect(
		() => {
			TestsAPI.requestTestList().then(
				(list) => { 
					setState((state) => { 
						return { ...state, testList: list, status: Status.Ok };
					});
				},
				(error) => {
					setState((state) => { 
						console.error(error);
						return { ...state, testList: null, status: Status.Failed, error: error };
					});
				}
			);
			return () => {};
		}, []
	);

	return (
		<Container className="mt-3">
				{
					(() => {
						if (state.status === Status.Ok) {
							return (
								<>
									{ /*
									<Row className="justify-content-center">
										<Col lg={6} xs={8}>
											<SearchBar
											placeholder="Поиск"
											onChange={(e) => { }}
											/>
										</Col>
									</Row>
									<Row className="mt-2 gy-2 justify-content-center">
										<Col className="col">
											<NamedDropdown 
											changeTitle={true}
											title="Сортировать" 
											items={{ 0: "Все", 1: "Лучшие", 2: "Треугольники", 3: "Объём", 4: "Прямоугольники" }} 
											onChange={(k, e) => {}} />
										</Col>
									</Row>
									*/ }
								<Container fluid className="mt-3 mb-5">
									<TestPreviewList tests={state.testList} />
								</Container>
								</>
							);
						} else if (state.status === Status.Failed) {
							return (
								<Alert variant="danger">
									<Alert.Heading>Ошибка</Alert.Heading>
									<p>{state.error.toString()}</p>
								</Alert>
							);
						} else {
							return (<Spinner animation="border" variant="secondary" />);
						}
					})()
				}
		</Container>
	);
}

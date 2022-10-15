import './CatalogPage.css';

import React, { useState, useEffect } from 'react';
import {
	Container,
	Row,
	Col,
	Spinner
} from 'react-bootstrap';
import TestsAPI from '../api/TestsAPI';

import SearchBar from '../components/SearchBar';
import NamedDropdown from '../components/NamedDropdown';
import TestPreviewList from '../components/TestPreviewList';


export default function CatalogPage() {
	const [ testList, setTestList ] = useState(null);

	useEffect(
		() => {
			let req = TestsAPI.requestTestList();
			req.then((list) => { setTestList(list); } );
			req.catch((list) => { setTestList(null); } );
			return () => {};
		},
		[]
	);

	return (
		<Container className="mt-3">
			
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
					theme="light"
					title="Тип задач" 
					items={{ 0: "Все", 1: "Треугольники", 2: "Объём", 3: "Прямоугольники" }} 
					onChange={(k, e) => {}} />
				</Col>
			</Row>

			<Container fluid className="mt-3 mb-5">
				{
					(testList !== null) ? (
						<TestPreviewList tests={testList} />
					) : (
						<Spinner animation="border" variant="secondary" />
					)
				}
			</Container>

		</Container>
	);
}

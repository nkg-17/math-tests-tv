import './CatalogPage.css';

import React, { useState } from 'react';
import {
	Container,
	Row,
	Col
} from 'react-bootstrap';
import TestsAPI from '../api/TestsAPI';

import TestPreviewCard from '../components/TestPreviewCard';
import SearchBar from '../components/SearchBar';
import NamedDropdown from '../components/NamedDropdown';


export default function CatalogPage() {
	const [ previewList, setPreviewList ] = useState(null);
	if (previewList === null)
		TestsAPI.requestPreviewList().then((list) => { setPreviewList(list); } );

	return (
		<Container className="mt-3">
			
			<Row className="justify-content-center">
				<Col lg={6} xs={8}>
					<SearchBar onChange={(e) => console.log(e.target.value)}/>
				</Col>
			</Row>
			<Row className="mt-2 gy-2 justify-content-center">
				<Col className="col-auto">
					<NamedDropdown 
					changeTitle={true}
					theme="light"
					title="Тип задач" 
					items={{ 0: "Все", 1: "Треугольники", 2: "Объём", 3: "Прямоугольники" }} 
					onChange={(k, e) => {}} />
				</Col>
				<Col className="col-auto">
					<NamedDropdown 
					changeTitle={true}
					theme="light"
					title="Сортировать" 
					items={{ 0: "За всё время", 1: "Сначала новые", 2: "Сначала старые" }} 
					onChange={(k, e) => {}} />
				</Col>
			</Row>

			<Container fluid className="mt-3 mb-5">
				<Row className="gx-5 gy-4">
					{
						(previewList !== null)
						? previewList.map((preview) => {
								return (
									<Col key={preview.id}
									lg={3} md={4} sm={6} xs={12} 
									className="d-flex flex-row justify-content-center">
									<TestPreviewCard data={preview} />
									</Col>
								);
							})
						: <label>Waiting...</label>
					}
				</Row>
			</Container>
		</Container>
	);
}

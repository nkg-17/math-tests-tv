import React from 'react';
import {
	Row,
	Col
} from 'react-bootstrap';

import NamedDropdown from '../../components/NamedDropdown';
import SearchBar from 	'../../components/SearchBar';


function TestSearchForm(props) {
	return (
		<>
			<Row className="justify-content-center">
				<Col lg={6} xs={8}>
					<SearchBar
					placeholder="Поиск"
					onChange={(txt) => { }}
					/>
				</Col>
			</Row>
			<Row className="mt-2 gy-2 justify-content-center">
				<Col className="col">
					<NamedDropdown 
					changeTitle={true}
					title="Сортировать" 
					items={{ 0: "Все", 1: "Лучшие", 2: "Треугольники", 3: "Объём", 4: "Прямоугольники" }} 
					onChange={(key) => {}} />
				</Col>
			</Row>
		</>
	);
}

export default TestSearchForm;
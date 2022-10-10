
import React, { useState } from 'react';
import {
	Container,
	InputGroup,
	Form,
	Row,
	Col
} from 'react-bootstrap';
import TestPreviewCard from '../components/TestPreviewCard';
import TestsAPI from '../api/TestsAPI';

export default function CatalogPage() {
	const [ previewList, setPreviewList ] = useState([]);
	if (previewList.length === 0)
		TestsAPI.requestPreviewList().then((list) => { setPreviewList(list); } );

	return (
		<Container className="mt-3">
			<Row className="justify-content-start">
				<Col md={4} sm={6} xs={8}>
					<InputGroup>
						<InputGroup.Text>
							<i className="bi bi-search"/>
						</InputGroup.Text>
						<Form.Control id="search-bar" placeholder="Поиск" onInput={(e) => {}}/>
					</InputGroup>
				</Col>
			</Row>

			<Container fluid className="mt-3 mb-5 px-4">
				<Row className="gx-5 gy-4">
					{
						previewList.map((preview) => {
							return (
								<Col key={preview.id}
								lg={3} md={4} sm={6} xs={12} 
								className="d-flex flex-row justify-content-center">
								<TestPreviewCard data={preview} />
								</Col>
							);
						})
					}
				</Row>
			</Container>
		</Container>
	);
}

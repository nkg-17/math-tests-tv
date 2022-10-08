
import React from 'react';
import {
	Container,
	InputGroup,
	Form,
	Row,
	Col
} from 'react-bootstrap';
import TestCard from '../components/TestCard';


export default function CatalogPage() {
	return (
		<Container className="mt-3">
			<Row className="justify-content-start">
				<Col md={4} sm={6} xs={8}>
					<InputGroup>
						<InputGroup.Text>
							<i className="bi bi-search"/>
						</InputGroup.Text>
						<Form.Control placeholder="Поиск"/>
					</InputGroup>
				</Col>
			</Row>

			<Container fluid className="mt-3 mb-5 px-4">
				<Row className="gx-5 gy-4">
					<Col lg={3} md={4} sm={6} xs={12} className="d-flex flex-row justify-content-center"><TestCard title="Title Title Title Title Title Title" text="Sample text Sample text Sample text Sample text Sample text Sample text"/></Col>
					<Col lg={3} md={4} sm={6} xs={12} className="d-flex flex-row justify-content-center"><TestCard title="Title" text="Sample text Sample text Sample text Sample text Sample text Sample text"/></Col>
					<Col lg={3} md={4} sm={6} xs={12} className="d-flex flex-row justify-content-center"><TestCard title="Title" text="Sample text"/></Col>
					<Col lg={3} md={4} sm={6} xs={12} className="d-flex flex-row justify-content-center"><TestCard title="Title" text="Sample text Sample text Sample text Sample text Sample text Sample text"/></Col>
					<Col lg={3} md={4} sm={6} xs={12} className="d-flex flex-row justify-content-center"><TestCard title="Title" text="Sample text"/></Col>
					<Col lg={3} md={4} sm={6} xs={12} className="d-flex flex-row justify-content-center"><TestCard title="Title" text="Sample text"/></Col>
					<Col lg={3} md={4} sm={6} xs={12} className="d-flex flex-row justify-content-center"><TestCard title="Title" text="Sample text"/></Col>
				</Row>
			</Container>
		</Container>
	);
}

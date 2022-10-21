import React from 'react';
import {
	Container,
	Row,
	Col
} from 'react-bootstrap';

import TestPreviewCard from './TestPreviewCard';


function TestPreviewList(props) {
	return (
		<Container fluid className="mt-3 mb-5">
			<Row className="gx-5 gy-4">
				<Col
				lg={3} md={4} sm={6} xs={12}>
				<TestPreviewCard test={{ id: -1, title: '404', tags: [], problem: { text: '', picture: '/math-tests/logo192.png' } }} />
				</Col>
				{
					props.tests.map((test) => {
						return (
							<Col key={test.id}
							lg={3} md={4} sm={6} xs={12}>
							<TestPreviewCard test={test} />
							</Col>
						);
					})
				}
			</Row>
		</Container>
	);
}

export default TestPreviewList;
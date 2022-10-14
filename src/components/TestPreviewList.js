import React from 'react';
import {
	Row,
	Col
} from 'react-bootstrap';

import TestPreviewCard from '../components/TestPreviewCard';


export default function TestPreviewList(props) {
	return (
		<Row className="gx-5 gy-4">
			<Col
			lg={3} md={4} sm={6} xs={12} 
			className="d-flex flex-row justify-content-center">
			<TestPreviewCard test={{ id: -1, name: 'Unknown test', text: ' test ID: -1', tags: [], problem: { pictureUrl: '/math-tests/logo192.png' } }} />
			</Col>
			{
				props.tests.map((test) => {
					return (
						<Col key={test.id}
						lg={3} md={4} sm={6} xs={12} 
						className="d-flex flex-row justify-content-center">
						<TestPreviewCard test={test} />
						</Col>
					);
				})
			}
		</Row>
	);
}

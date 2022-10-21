import React from 'react';
import {
	Container,
	Row, Col
} from 'react-bootstrap';

import TestNavTabs from		'./TestNavTabs';
import ProblemPanel from 	'./ProblemPanel';
import PicturePanel from 	'./PicturePanel';


function DoublePanelLayout(props) {
	return (
		<Container className="py-3">
			<Row className="mb-1 d-flex flex-row justify-content-start">
				<Col md={6} sm={12}> <TestNavTabs /> </Col>
			</Row>
			<Row className="gy-2">
				<Col md={6} sm={12}> <ProblemPanel test={props.test}/> </Col>
				<Col md={6} sm={12}> <PicturePanel test={props.test}/> </Col>
			</Row>
		</Container>
	);
}

export default DoublePanelLayout;
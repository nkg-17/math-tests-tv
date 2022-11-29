
import './TestHeader.css';

import { useContext } from 'react';
import { Row, Col } from 'react-bootstrap';

import TestContext from '../TestContext';

function TestHeader(props) {
	const context = useContext(TestContext);

	return (
		<div className="TestHeader">
			<h3 className="TestHeaderTitle">
				<Row className="justify-content-between">
					<Col className="col-auto TestHeaderTitleText">
						<i className="TestHeaderIcon bi bi-pencil" />
						{context.test.title}
					</Col>
				</Row>
			</h3>
		</div>
	);
}

export default TestHeader;
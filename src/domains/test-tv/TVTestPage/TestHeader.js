
import './TestHeader.css';

import { Row, Col } from 'react-bootstrap';

function TestHeader(props) {
	return (
		<div className="TestHeader">
			<h3 className="TestHeaderTitle">
				<Row className="justify-content-between">
					<Col className="col-auto">
						<i className="TestHeaderIcon bi bi-pencil" />
						{props.title}
					</Col>
				</Row>
			</h3>
		</div>
	);
}

export default TestHeader;
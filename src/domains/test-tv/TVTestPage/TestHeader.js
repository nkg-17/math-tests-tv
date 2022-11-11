
import './TestHeader.css';

import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import RoutePaths from '../../../constants/RoutePaths';

function TestHeader(props) {
	return (
		<div className="TestHeader">
			<h3 className="TestHeaderTitle">
				<Row className="justify-content-between">
					<Col className="col-auto">
						<i className="TestHeaderIcon bi bi-pencil" />
						{props.title}
					</Col>
					<Col className="col-auto">
						<LinkContainer to={RoutePaths.HELP}>
							<Link>
								<div className="h-100 d-flex flex-column justify-content-center">
									<i className="text-muted bi bi-info-circle TestHeaderHelp" />
								</div>
							</Link>
						</LinkContainer>
					</Col>
				</Row>
			</h3>
		</div>
	);
}

export default TestHeader;
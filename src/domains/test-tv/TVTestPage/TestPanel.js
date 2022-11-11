
import './TestPanel.css';

import { Stack, Col } from 'react-bootstrap';

import TestHeader from './TestHeader';
import TestBody from './TestBody';
import TestFooter from './TestFooter';


function TestPanel(props) {
	return (
		<Col className="col-auto">
			<Stack className="TestPanel" gap={3}>
				<TestHeader title={props.test.title} />
				<TestBody test={props.test} />
				<TestFooter align="end" test={props.test} />
			</Stack>
		</Col>
	);
}

export default TestPanel;
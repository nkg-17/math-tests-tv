
import './TestPanel.css';

import { Stack } from 'react-bootstrap';

import TestHeader from '../TestHeader';
import TestBody from '../TestBody';
import TestFooter from '../TestFooter';

function TestPanel(props) {
	return (
		<Stack className="TestPanel" gap={3}>
			<TestHeader />
			<TestBody />
			<TestFooter align="end" />
		</Stack>
	);
}

export default TestPanel;
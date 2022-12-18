
import './TestPanel.css';

import { Stack } from 'react-bootstrap';

import TestHeader from 	'domains/test-tv/TVTestPage/TestHeader';
import TestBody from 	'domains/test-tv/TVTestPage/TestBody';
import TestFooter from 	'domains/test-tv/TVTestPage/TestFooter';

function TestPanel(props) {
	return (
		<Stack className="TestPanel" gap={0}>
			<TestHeader />
			<TestBody />
			<TestFooter align="end" />
		</Stack>
	);
}

export default TestPanel;
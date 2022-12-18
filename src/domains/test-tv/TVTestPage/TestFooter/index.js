import './index.css';

import { useContext } from 'react';
import { Row } from 'react-bootstrap';

import TestSubmitForm from 'domains/test-tv/TVTestPage/TestSubmitForm';

import TestContext from 'domains/test-tv/TVTestPage/TestContext';


function TestFooter(props) {
	const context = useContext(TestContext);

	return (
		<Row className="TestFooter justify-content-between">
			<TestSubmitForm 
			placeholder={context.test.problem.answer.placeholder} 
			state="valid" />
		</Row>
	);
}

export default TestFooter;
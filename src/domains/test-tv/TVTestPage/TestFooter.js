
import { useContext } from 'react';
import { Row } from 'react-bootstrap';

import TestSubmitForm from './TestSubmitForm';

import TestContext from './TestContext';


function TestFooter(props) {
	const context = useContext(TestContext);

	return (
		<Row className="justify-content-between">
			<TestSubmitForm 
			placeholder={context.test.problem.answer.placeholder} 
			state="valid" />
		</Row>
	);
}

export default TestFooter;
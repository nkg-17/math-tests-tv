
import { Row } from 'react-bootstrap';

import TestSubmitForm from './TestSubmitForm';


function TestFooter(props) {
	return (
		<Row className="justify-content-between">
			<TestSubmitForm 
			placeholder={props.test.problem.answer.placeholder} 
			state="valid" />
		</Row>
	);
}

export default TestFooter;
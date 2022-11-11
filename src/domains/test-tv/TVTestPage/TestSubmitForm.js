
import './TestSubmitForm.css';

import { useRef, useContext } from 'react';
import { Col, Stack, Button, Form } from 'react-bootstrap';

import TestContext from './TestContext';


function TestSubmitForm(props) {
	const context = useContext(TestContext);
	const textInput = useRef(null);

	const onClick = () => {
		context.submitAnswer(textInput.current.value);
	};
	
	if (context.doneAnswering)
		textInput.current.value = context.test.solution.answer;

	return (
		<>
			{
				(!context.doneAnswering) ? (
					<Col className="col-auto">
						<Button variant="light" size="lg" onClick={context.openSolution}>
							<i className="text-muted bi bi-unlock" />
						</Button>
					</Col>
				) : (<></>)
			}
			<Col className="ms-auto col-auto">
				<Stack gap={3} className="d-flex flex-row">
					<Form.Control 
					ref={textInput}
					className="TestSubmitFormInput"
					isValid={context.answerState === "valid"}
					isInvalid={context.answerState === "invalid"}
					size="lg"  
					placeholder={props.placeholder} 
					type="text" disabled={context.doneAnswering}/>
					<Button 
					variant="success" 
					type="button" 
					size="lg"
					disabled={context.doneAnswering}
					onClick={onClick}>
						Ответить
					</Button>
				</Stack>
			</Col>
		</>
	);
}

export default TestSubmitForm;

import './TestSubmitForm.css';

import { useRef, useContext } from 'react';
import { Col, Stack, Button, Form } from 'react-bootstrap';

import TestContext from './TestContext';


function TestSubmitForm(props) {
	const context = useContext(TestContext);
	const textInput = useRef(null);

	const onNext = () => {
		context.loadNextTest();
		textInput.current.value = "";
	};

	const onSubmit = () => {
		context.submitAnswer(textInput.current.value);
	};

	const submitButton = (
		<Button 
		variant="success"
		type="button" 
		size="lg"
		onClick={onSubmit}>
			Ответить
		</Button>
	);

	const nextButton = (
		<Button 
		variant="primary"
		type="button" 
		size="lg"
		style={{color: "white"}}
		onClick={onNext}>
			Следующая
		</Button>
	);
	
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
					{context.doneAnswering ? nextButton : submitButton}
				</Stack>
			</Col>
		</>
	);
}

export default TestSubmitForm;

import './TestSubmitForm.css';

import { useState, useRef, useContext } from 'react';
import { Form, Col, Stack, Button } from 'react-bootstrap';

import TestContext from 'domains/test-tv/TVTestPage/TestContext';


function TestSubmitForm(props) {
	const [ isNextDisabled, setNextDisabled ] = useState(false);
	const context = useContext(TestContext);
	const textInput = useRef(null);

	const onNext = () => {
		setNextDisabled(() => true);
		context.loadNextTest();
	};

	const onSubmit = () => {
		context.submitAnswer(textInput.current.value);
	};

	const submitButton = (
		<Button 
		variant="success"
		type="button" 
		onClick={onSubmit}
		className="TestSubmitFormButton">
			Ответить
		</Button>
	);

	const nextButton = (
		<Button 
		disabled={isNextDisabled}
		variant="primary"
		type="button" 
		style={{color: "white"}}
		onClick={onNext}
		className="TestSubmitFormButton">
			Следующая
		</Button>
	);

	if (context.isDoneAnswering)
		textInput.current.value = context.test.solution.answer;

	return (
		<>
			{
				(!context.isDoneAnswering) ? (
					<Col className="col-auto">
						<Stack gap={1} className="flex flex-row">
							<Button variant="light" onClick={context.openSolution}>
								<i className="text-muted bi bi-unlock" />
							</Button>
							<Button 
							variant="light"
							type="button" 
							onClick={onNext}>
								<i className="text-muted bi bi-arrow-right" />
							</Button>
						</Stack>
					</Col>
				) : (<></>)
			}
			<Col className="ms-auto col-auto">
				<Stack gap={3} className="d-flex flex-row">
					{/*
					<TouchInputField
					ref={textInput}
					isValid={context.answerState === "valid"}
					isInvalid={context.answerState === "invalid"}
					placeholder={props.placeholder}
					disabled={context.isDoneAnswering} />
					*/}
					
					<Form.Control 
					ref={textInput}
					className="TestSubmitFormInput"
					isValid={context.answerState === "valid"}
					isInvalid={context.answerState === "invalid"}
					placeholder={props.placeholder} 
					type="text" disabled={context.isDoneAnswering}/>

					{context.isDoneAnswering ? nextButton : submitButton}
				</Stack>
			</Col>
		</>
	);
}

export default TestSubmitForm;
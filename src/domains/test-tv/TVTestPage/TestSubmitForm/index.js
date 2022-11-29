
import './TestSubmitForm.css';

import { useState, useRef, useContext } from 'react';
import { Form, Col, Stack, Button } from 'react-bootstrap';

// import TouchInputField from '../../../../components/TouchInputField';

import TestContext from '../TestContext';


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
		size="lg"
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
		size="lg"
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
						<Button variant="light" size="lg" onClick={context.openSolution}>
							<i className="text-muted bi bi-unlock" />
						</Button>
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
					size="lg"  
					placeholder={props.placeholder} 
					type="text" disabled={context.isDoneAnswering}/>

					{context.isDoneAnswering ? nextButton : submitButton}
				</Stack>
			</Col>
		</>
	);
}

export default TestSubmitForm;
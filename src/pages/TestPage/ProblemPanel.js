import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import {
	Container,
	Button
} from 'react-bootstrap';


function ProblemPanel(props) {
	return (
		<>
			<Container className="TestProblemPanel p-3 border">
				<Container fluid className="TestProblemHeader d-flex flex-row justify-content-between">
					<h2>{""}</h2>
					<i className={"bi " + (false ? "bi-star-fill" : "")} style={{color: "gold", fontSize: "1.25rem"}} />
				</Container>
				<div className="TestProblemBody mx-1 overflow-auto">
					
				</div>
			</Container>

			<div className="w-100 py-2 d-flex flex-row justify-content-between">
				<LinkContainer to={ "/" }><Button variant="light">Вернутся</Button></LinkContainer>
				<LinkContainer to={ "/" }><Button variant="light">Следующая задача</Button></LinkContainer>
			</div>
		</>
	);
}

export default ProblemPanel;
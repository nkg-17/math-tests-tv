import React from 'react';
import {
	Button
} from 'react-bootstrap';


function ProblemTab(props) {
	return (
		<div>
			
		</div>
	);
}

export default ProblemTab;

/*
	<div>
		{
			(props.test.problem.preface) ? (
				<p>&emsp;{props.test.problem.preface}</p>
			) : (<></>)
		}
		{
			(props.test.problem.tasks) ? (
				props.test.problem.tasks.map((task, i) => { return (
					<div key={i}>
						<h5>{i+1}. {task.title}</h5>
						<p>&emsp;{task.text}</p>
					</div>
				); })
			) : (<></>)
		}
	</div>
	{
		<Button 
		variant="outline-success" 
		onClick={props.onOpenSolution}>
			Открыть решение
		</Button>
	}
*/
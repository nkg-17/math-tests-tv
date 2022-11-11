
import './TestBody.css';

import { useContext } from 'react';

import TestContext from './TestContext';


function TestBody(props) {
	const context = useContext(TestContext);

	const solution = (
		<>
			{
				(props.test.solution.text) ? (
					<>
						<h4>Решение</h4>
						<p>{props.test.solution.text}</p>
					</>
				) : (<></>)
			}
		</>
	);

	return (
		<div className="TestBody">
			<p>{props.test.problem.text}</p>
			{(context.doneAnswering) ? (solution) : (<></>)}
		</div>
	);
}

export default TestBody;
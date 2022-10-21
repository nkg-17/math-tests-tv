import React from 'react';


function SolutionTab(props) {
	return (
		<>
			<p>&emsp;{props.test.solution.preface}</p>
			{
				(props.test.solution.answer) ? (
					<p>
						<b>Ответ:</b> {props.test.solution.answer}
					</p>
				) : (<></>)
			}
			{
				(props.test.solution.tasks) ? (
					props.test.solution.tasks.map((task, i) => { return (
						<p key={i}>
							<b>{i+1})</b> {task.text}

							{
								(task.answer) ? (
									<>
										<br />
										<b>Ответ:</b> {task.answer}
									</>
								) : (<></>)
							}
						</p>
					); })
				) : (<></>)
			}
		</>
	);
}

export default SolutionTab;
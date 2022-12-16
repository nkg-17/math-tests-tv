
import './TestBody.css';

import { useContext } from 'react';
import { motion } from 'framer-motion';

import TestContext from 'domains/test-tv/TVTestPage/TestContext';


function TestBody(props) {
	const context = useContext(TestContext);
	const test = context.test;

	const fadeInMotion = {
		initial: {
			y: -5, opacity: 0
		},
		animate: (props) => {
			return {
				y: 0, opacity: 1,
				transition: {
					delay: props.delay,
					type: "tween"
				}
			};
		}
	};

	const solution = (
		<>
			{
				(test.solution.text) ? (
					<>
						<motion.h4 
						initial="initial" 
						animate="animate" 
						custom={{ delay: 0 }}
						variants={fadeInMotion}
						className="TestBodyText">
							Решение
						</motion.h4>
						<motion.p 
						initial="initial" 
						animate="animate" 
						custom={{ delay: 0.1 }}
						variants={fadeInMotion}
						className="TestBodyText">
							{test.solution.text}
						</motion.p>
					</>
				) : (<></>)
			}
		</>
	);

	return (
		<div className="TestBody">
			<motion.p 
			initial="initial" 
			animate="animate" 
			custom={{ delay: 0.2 }}
			variants={fadeInMotion}
			className="TestBodyText">
				{test.problem.text}
			</motion.p>
			{(context.isDoneAnswering) ? (solution) : (<></>)}
		</div>
	);
}

export default TestBody;
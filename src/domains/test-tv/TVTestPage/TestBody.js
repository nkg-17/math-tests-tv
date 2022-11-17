
import './TestBody.css';

import { useContext } from 'react';
import { motion } from 'framer-motion';

import TestContext from './TestContext';


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
					delay: props.delay
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
						variants={fadeInMotion}>
							Решение
						</motion.h4>
						<motion.p 
						initial="initial" 
						animate="animate" 
						custom={{ delay: 0.1 }}
						variants={fadeInMotion}>
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
			variants={fadeInMotion}>
				{test.problem.text}
			</motion.p>
			{(context.doneAnswering) ? (solution) : (<></>)}
		</div>
	);
}

export default TestBody;
import './TestPage.css';

import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';

import TestPanel 			from '../TestPanel';
import TestReportErrorModal from '../TestReportErrorModal';
import Loading 				from '../../../../components/Loading';

import TestContext 	from '../TestContext';

function TestPage() {
	const context = useContext(TestContext);
	return (
		<>
			<TestReportErrorModal show={context.isErrorReportOpened} onClose={() => context.setErrorReportOpened(false)} />

			{ (context.status === 'waiting' || context.test === null) && 
				<div style={{position: "absolute", top: "50vh", left: "50vw", transform: "translate(-50%, -50%)"}}>
					<Loading />
				</div>
			}

			<Container fluid className="mt-auto mb-auto" style={{textAlign: "center"}}>
				<AnimatePresence>
					{
						(context?.test && context.status !== 'waiting') && 
						<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1, transition: { type: "tween" } }}
						exit={{ opacity: 0, scale: 0.95, transition: { type: "tween" } }}>
							<TestPanel />
						</motion.div>
					}
				</AnimatePresence>
			</Container>
			
			<button 
			className="btn BugReportButton" 
			type="button"
			onClick={() => context.setErrorReportOpened(true)}>
				<i className="bi bi-exclamation-triangle" />
			</button>
		</>
	);
}

export default TestPage;

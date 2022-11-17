import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';

import TestPanel 	from './TestPanel';
import Loading 		from '../../../components/Loading';

import TestContext 	from './TestContext';

function TestPage() {
	const context = useContext(TestContext);
	return (
		<>
			{ (context.status !== 'ok') && 
				<div style={{position: "absolute", top: "50vh", left: "50vw"}}>
					<Loading />
				</div>
			}
			<Container fluid className="mt-auto mb-auto" style={{textAlign: "center"}}>
				<AnimatePresence>
					{
						(context.status === 'ok') && 
						<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1, transition: { when: "beforeChildren" } }}
						exit={{ opacity: 0 }}>
							<TestPanel />
						</motion.div>
					}
				</AnimatePresence>
			</Container>
		</>
	);
}

export default TestPage;


import { useContext } from 'react';
import { Row } from 'react-bootstrap';

import TestPanel 		from './TestPanel';
import TestSwipeButton 	from './TestSwipeButton';
import TestContainer 	from './TestContainer';

import TestContext from './TestContext';


function TestPage(props) {
	const context = useContext(TestContext);
	return (
		<TestContainer>
			<Row className="d-flex justify-content-center">				
				<TestSwipeButton direction="left" onClick={context.loadPrevTest} />
				<TestPanel test={context.test} />
				<TestSwipeButton direction="right" onClick={context.loadNextTest} />
			</Row>
		</TestContainer>
	);
}

export default TestPage;

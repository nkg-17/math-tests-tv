
import { Container } from 'react-bootstrap';


function TestContainer(props) {
	return (
		<Container fluid className="mt-auto mb-auto" style={{textAlign: "center"}}>
			{props.children}
		</Container>
	);
}

export default TestContainer;
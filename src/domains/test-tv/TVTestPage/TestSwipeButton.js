
import { Col, Button } from 'react-bootstrap';


function TestSwipeButton(props) {
	return (
		<Col className="col-auto d-flex flex-column justify-content-center">
			<Button 
			variant="info">
				<img
				src={`arrow-right.svg`} 
				style={{transform: `rotate(${props.direction === "left" ? "180" : "0"}deg)`}}
				alt=""
				onClick={props.onClick}/>
			</Button>
		</Col>
	);
}

export default TestSwipeButton;
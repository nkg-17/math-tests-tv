import React from 'react';
import {
	Alert
} from 'react-bootstrap';


function Warning(props) {
	return (
		<Alert variant="danger">
			<Alert.Heading>{props.heading}</Alert.Heading>
			<p>{props.text}</p>
		</Alert>
	);
}

export default Warning;
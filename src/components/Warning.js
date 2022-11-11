import React, { memo } from 'react';
import {
	Alert
} from 'react-bootstrap';


function Warning(props) {
	return (
		<Alert variant="danger">
			<Alert.Heading>{props.heading}</Alert.Heading>
			<p>{props.text}</p>
			{
				(props.description) ? (
					<>
						<hr />
						<p>{props.description}</p>
					</>
				) : (<></>)
			}
		</Alert>
	);
}

export default memo(Warning);
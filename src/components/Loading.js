import React from 'react';
import {
	Spinner
} from 'react-bootstrap';


function Loading(props) {
	return (
		<Spinner animation="border" variant="secondary" />
	);
}

export default Loading;
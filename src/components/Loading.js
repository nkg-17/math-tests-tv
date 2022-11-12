import React, { memo } from 'react';
import {
	Spinner
} from 'react-bootstrap';


function Loading() {
	return (
		<Spinner animation="border" variant="light" />
	);
}

export default memo(Loading);
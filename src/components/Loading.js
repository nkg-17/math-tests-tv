import React, { memo } from 'react';
import {
	Spinner
} from 'react-bootstrap';

import ColorPalette from '../constants/ColorPalette';


function Loading() {
	return (
		<Spinner animation="border" variant={ColorPalette.loading} />
	);
}

export default memo(Loading);
import './TouchInputField.css';

import React, { useState, useRef, useEffect } from 'react';
import { Form, Overlay, Button } from 'react-bootstrap';

// import Numpad from './Numpad';

// import TouchInputFieldContext from './TouchInputFieldContext';


function TouchInputField(props, ref) {
	const [ isNumpadShowed, setShowNumpad ] = useState(false);

	return (
		<>
			<Overlay target={ref} show={isNumpadShowed} placement="right">
	        {({ placement, arrowProps, show: _show, popper, ...props }) => (
	          <div
	            {...props}
	            style={{
	              position: 'absolute',
	              backgroundColor: 'rgba(255, 100, 100, 0.85)',
	              padding: '2px 10px',
	              color: 'white',
	              borderRadius: 3,
	              ...props.style,
	            }}>
	            Simple tooltip
	          </div>
	        )}
	      </Overlay>

			<Form.Control 
			size="lg" 
			readOnly={true}
			onFocus={() => setShowNumpad(true)}
			onBlur={() => setShowNumpad(false)}
			ref={ref}
			isInvalid={props.isInvalid}
			isValid={props.isValid}
			disabled={props.disabled}
			placeholder={props.placeholder} />
		</>
	);
}

export default React.forwardRef(TouchInputField);
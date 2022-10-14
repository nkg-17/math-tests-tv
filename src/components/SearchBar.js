
import React, { useState } from 'react';
import {
	InputGroup,
	Form,
	Spinner
} from 'react-bootstrap';

export default function SearchBar(props) {
	const [ isSelected, setSelected ] = useState(false);

	return (
		<InputGroup>
			<InputGroup.Text>
			{
				(props.loading) ? (
					<Spinner 
					animation="border" 
					variant="secondary" 
					size="sm" 
					style={{ borderWidth: "0.15rem" }} />
				) : (
					<i className="bi bi-search"/>
				)
			}
			</InputGroup.Text>
			<Form.Control  
				placeholder={props.placeholder}
				onClick={(e) => { setSelected(!isSelected); }}
				onInput={(e) => { if (props.onChange) props.onChange(e); }}
				/>
		</InputGroup>
	);
}


import React, { useState } from 'react';
import {
	InputGroup,
	Form
} from 'react-bootstrap';

export default function SearchBar(props) {
	const [ isSelected, setSelected ] = useState(false);

	return (
		<InputGroup>
			<InputGroup.Text>
				<i className="bi bi-search"/>
			</InputGroup.Text>
			<Form.Control  
				placeholder="Поиск" 
				onClick={(e) => { setSelected(!isSelected); }}
				onInput={(e) => { if (props.onChange) props.onChange(e); }}
				/>
		</InputGroup>
	);
}

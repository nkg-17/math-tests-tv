import React from 'react';
import {
	InputGroup,
	Form
} from 'react-bootstrap';


function SearchBar(props) {
	return (
		<InputGroup>
			<InputGroup.Text>
				<i className="bi bi-search"/>
			</InputGroup.Text>
			<Form.Control  
				placeholder={props.placeholder}
				onInput={(e) => { if (props.onChange) props.onChange(e.target.value); }}
				/>
		</InputGroup>
	);
}

export default SearchBar;
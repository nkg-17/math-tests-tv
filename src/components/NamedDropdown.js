import React, { useState } from 'react';
import { Dropdown, Button } from 'react-bootstrap';


const CustomToggle = React.forwardRef(({ children, onClick }, ref) => {
	return (
		<Button
		ref={ref}
		variant={"light"}
		onClick={e => {
			e.preventDefault();
			onClick(e);
		}}>
			<i className="bi bi-list me-2" style={{ color: "dark" }}></i>
			{children}
		</Button>
	);
});

function NamedDropdown(props) {
	function handleOnSelect(key, e) {
		if (props.onChange)
			props.onChange(key);

		if (props.changeTitle)
			setChoosedItem({ title: props.items[key], id: key });
	}

	const [ choosedItem, setChoosedItem ] = useState(null);

	let itemArray = [];
	for (let i in props.items)
		itemArray.push({ text: props.items[i], id: i});

	return (
		<Dropdown onSelect={handleOnSelect}>
			<Dropdown.Toggle as={CustomToggle}>
				{ (choosedItem !== null) ? choosedItem.title : props.title }
			</Dropdown.Toggle>
			<Dropdown.Menu variant="light">
				{ itemArray.map((i) => {
					return (<Dropdown.Item as="button" eventKey={i.id} key={i.id}>{i.text}</Dropdown.Item>);
				}) }
			</Dropdown.Menu>
		</Dropdown>
	);
}

export default NamedDropdown;
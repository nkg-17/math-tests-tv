import './dropdown.css';

import React, { useState } from 'react';
import { Dropdown, Button } from 'react-bootstrap';


const CustomToggle = React.forwardRef(({ children, onClick, theme }, ref) => {
	const CustomToggleThemeMap = {
		'light': { variant: 'light', color: 'dark' },
		'dark': { variant: 'secondary', color: 'light' }
	};
	return (
		<Button
		ref={ref}
		variant={CustomToggleThemeMap[theme].variant}
		onClick={e => {
			e.preventDefault();
			onClick(e);
		}}>
			<i className="bi bi-list me-2" style={{ color: CustomToggleThemeMap[theme].color }}></i>
			{children}
		</Button>
	);
});

export default function NamedDropdown(props) {
	function handleOnSelect(key, e) {
		if (props.onChange)
			props.onChange(key, e);

		if (props.changeTitle)
			setChoosedItem({ title: props.items[key], id: key });
	}

	const [ choosedItem, setChoosedItem ] = useState(null);

	const theme = (props.theme) ? props.theme : 'light';
	const themeMap = {
		'light': { toggle: 'light', menu: 'light' },
		'dark': { toggle: 'secondary', menu: 'dark' }
	}

	let itemArray = [];
	for (let i in props.items)
		itemArray.push({ text: props.items[i], id: i});

	return (
		<Dropdown onSelect={handleOnSelect}>
			<Dropdown.Toggle as={CustomToggle} theme={theme}>
				{ (choosedItem !== null) ? choosedItem.title : props.title }
			</Dropdown.Toggle>
			<Dropdown.Menu variant={themeMap[theme].menu} className="dropdown-animated-menu">
				{ itemArray.map((i) => {
					return (<Dropdown.Item as="button" eventKey={i.id} key={i.id}>{i.text}</Dropdown.Item>);
				}) }
			</Dropdown.Menu>
		</Dropdown>
	);
}

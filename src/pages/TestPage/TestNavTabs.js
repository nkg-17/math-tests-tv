import React from 'react';
import {
	Nav
} from 'react-bootstrap';


function TestNavTabs(props) {
	<Nav justify variant="pills" activeKey={0} onSelect={props.onSelect}>
		<Nav.Item><Nav.Link eventKey={0}>Условие</Nav.Link></Nav.Item>
		<Nav.Item><Nav.Link eventKey={1}>Подсказки</Nav.Link></Nav.Item>
		<Nav.Item><Nav.Link eventKey={2} disabled={true}>Решение</Nav.Link></Nav.Item>
	</Nav>
}

export default TestNavTabs;
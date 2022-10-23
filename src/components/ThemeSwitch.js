import React, { memo } from 'react';
import { Button } from 'react-bootstrap';


function ThemeSwitch(props) {
	function switchTheme() {
	}

	return (
		<Button variant="light" onClick={() => switchTheme()}>
			<i className="bi bi-moon" />
		</Button>
	);
}

export default memo(ThemeSwitch);
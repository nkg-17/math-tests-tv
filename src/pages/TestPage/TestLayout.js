import React from 'react';

import DoublePanelLayout from './DoublePanelLayout';


function TestLayout(props) {
	switch (props.test.layout) {
		case "double-panel":
			return (<DoublePanelLayout test={props.test} />);

		case "single-panel":
			return (<DoublePanelLayout test={props.test} />);

		default:
			return (<DoublePanelLayout test={props.test} />);
	}
}

export default TestLayout;
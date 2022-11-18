import './TestReportErrorModal.css';

import { useContext } from 'react';
import { Modal } from 'react-bootstrap';

import getErrorList from '../../../common/ErrorMonitor.js';
import TestContext from './TestContext';


function TestReportErrorModal(props) {
	const context = useContext(TestContext);

	return (
		<Modal show={props.show} onHide={props.onClose} className="TestReportErrorModal">
			<Modal.Header closeButton>
				<Modal.Title>Сообщить об ошибке</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<details>
					<summary>Данные задачи</summary>
					<pre className="TestReportModalCode mt-1">
						{JSON.stringify(context.test, null, 2)}
					</pre>
				</details>
				<details>
					<summary>Ошибки программы</summary>
					<pre className="TestReportModalCode mt-1">
						{ getErrorList().map((error) => { return formatError(error) + '\n'; }) }
					</pre>
				</details>
				<button onClick={() => { eval("const b;") }}>error!</button>
			</Modal.Body>
		</Modal>
	);
}

export default TestReportErrorModal;


function formatError(error) {
	return `${error.name}: "${error.message}"`;
}
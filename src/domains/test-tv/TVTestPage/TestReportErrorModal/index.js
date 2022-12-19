import './TestReportErrorModal.css';

import { useRef, useEffect, useState, useContext } from 'react';
import { Stack, Modal, Form, Button, Alert } from 'react-bootstrap';

import TestsAPI from 	'api/TestsAPI';
import TestContext from 'domains/test-tv/TVTestPage/TestContext';


function TestReportErrorModal(props) {
	const context = useContext(TestContext);
	const idInput = useRef(null);
	const [ IDList, setIDList ] = useState([]);
	const hasRenderedOnce = useRef(false);

	useEffect(() => {
		if (hasRenderedOnce.current) return;
		hasRenderedOnce.current = true;

		TestsAPI.requestIdList().then((ids) => setIDList(ids));
	}, []);

	return (
		<Modal show={props.show} onHide={props.onClose}>
			<Modal.Header closeButton>
				<Modal.Title>Сообщить об ошибке</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<Stack gap={1}>	

					<Alert variant="secondary">
						Если вы нашли ошибку на сайте, напишите сюда: <b>@xfnty</b> (Telegram).
					</Alert>

					<Stack gap={2} className="d-flex flex-row">
						<p className="mt-auto mb-auto">ID задачи: </p>
						<Form.Control ref={idInput} defaultValue={context?.test?.id} style={{ width: "auto" }} />
						<Button variant="primary" onClick={() => context.loadTest(idInput.current.value)}>Открыть</Button>
					</Stack>

					<details>
						<summary>Данные задачи</summary>
						<pre className="TestReportModalCode mt-1">
							{JSON.stringify(context.test, null, 2)}
						</pre>
					</details>

					<details>
						<summary>Список ID задач</summary>
						<pre className="TestReportModalCode mt-1">
							{IDList.join('\n')}
						</pre>
					</details>

				</Stack>
			</Modal.Body>
		</Modal>
	);
}

export default TestReportErrorModal;
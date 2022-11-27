import './TestReportErrorModal.css';

import { useRef, useEffect, useState, useContext } from 'react';
import { Stack, Modal, Form, Button } from 'react-bootstrap';

import TestsAPI from '../../../api/TestsAPI';
import TestContext from './TestContext';


function TestReportErrorModal(props) {
	const context = useContext(TestContext);
	const idInput = useRef(null);
	const [ IDList, setIDList ] = useState([]);
	const hasRenderesOnce = useRef(false);

	useEffect(() => {
		if (hasRenderesOnce.current) return;
		hasRenderesOnce.current = true;

		TestsAPI.requestIdList().then((ids) => setIDList(ids));
	}, []);

	return (
		<Modal show={props.show} onHide={props.onClose} className="TestReportErrorModal">
			<Modal.Header closeButton>
				<Modal.Title>Статус задачи</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<Stack gap={3}>
					<div>По всем вопросам писать сюда: <b>@xfnty</b> (TG)</div>

					<Stack gap={2} className="d-flex flex-row">
						<a href="https://github.com/nkg-17/math-tests-tv" target="_blank" rel="noreferrer">Проект на GitHub</a>
						{ (context.test) && <a href={`https://github.com/nkg-17/tv-tests-archive/tree/main/tests/${context?.test?.id}/description.json`} target="_blank" rel="noreferrer">Ссылка на задачу</a> }
					</Stack>

					<Stack gap={2} className="d-flex flex-row">
						<p className="mt-auto mb-auto">ID: </p>
						<Form.Control ref={idInput} defaultValue={context?.test?.id} style={{ width: "auto" }} />
						<Button variant="primary" onClick={() => context.loadTest(idInput.current.value)}>Открыть</Button>
					</Stack>

					<details>
						<summary>Список ID задач</summary>
						<pre className="TestReportModalCode mt-1">
							{IDList.join('\n')}
						</pre>
					</details>
					
					<details>
						<summary>Данные задачи</summary>
						<pre className="TestReportModalCode mt-1">
							{JSON.stringify(context.test, null, 2)}
						</pre>
					</details>
				</Stack>
			</Modal.Body>
		</Modal>
	);
}

export default TestReportErrorModal;
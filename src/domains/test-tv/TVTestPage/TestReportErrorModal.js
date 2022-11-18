import './TestReportErrorModal.css';

// import { useContext } from 'react';
import { Modal } from 'react-bootstrap';

// import TestContext from './TestContext';


function TestReportErrorModal(props) {
	// const context = useContext(TestContext);

	return (
		<Modal show={props.show} onHide={props.onClose} className="TestReportErrorModal">
			<Modal.Header closeButton>
				<Modal.Title>Сообщить об ошибке</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				(В разработке)
			</Modal.Body>
		</Modal>
	);
}

export default TestReportErrorModal;
import { LinkContainer } from 'react-router-bootstrap';
import React from 'react';
import {
	Container, Alert
} from 'react-bootstrap';


function ErrorPage(props) {
	return (
		<Container className="mt-3">
			<Alert variant="danger">
				<Alert.Heading>Ошибка</Alert.Heading>
				<p>
					<LinkContainer to="/"><Alert.Link>Вернуться на Главную страницу</Alert.Link></LinkContainer>
				</p>
			</Alert>
		</Container>
	);
}

export default ErrorPage;
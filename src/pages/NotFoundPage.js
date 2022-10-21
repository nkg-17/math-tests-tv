import { LinkContainer } from 'react-router-bootstrap';
import React from 'react';
import {
	Container, Alert
} from 'react-bootstrap';


function NotFoundPage(props) {
	return (
		<Container className="mt-3">
			<Alert variant="danger">
				<Alert.Heading>Страница не существует.</Alert.Heading>
				<p>
					<LinkContainer to="/"><Alert.Link>Вернуться на Главную страницу</Alert.Link></LinkContainer>
				</p>
			</Alert>
		</Container>
	);
}

export default NotFoundPage;
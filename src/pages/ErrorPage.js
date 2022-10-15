import { LinkContainer } from 'react-router-bootstrap';
import React from 'react';
import {
	Container, Alert
} from 'react-bootstrap';


export default function ErrorPage(props) {
	if (props.message) {
		return (
			<Container className="mt-3">
				<Alert variant="danger">
					<Alert.Heading>{props.message.title}</Alert.Heading>
					{
						(props.message.description) ? (
							<div>
								<p>
									{props.message.description}
								</p>
								<hr />
							</div>
						) : (<></>)
					}
					<p>
						<LinkContainer to="/"><Alert.Link>Вернуться на Главную страницу</Alert.Link></LinkContainer>
					</p>
				</Alert>
			</Container>
		);
	} else {
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
}

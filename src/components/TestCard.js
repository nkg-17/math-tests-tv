
import './TestCard.css';
import image from './logo.png';

import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';


export default function TestCard(props) {
	return (
		<div className="TestCard">
			<LinkContainer to="/test">
				<Link className="text-dec-none">
					<Card>
						<Row className="justify-content-center"><Col>
							<Card.Img className="TestCardImg" src={image} />
						</Col></Row>
						<Card.Body>
							<Card.Title className="TestCardTitle">{props.title}</Card.Title>
							<Card.Text className="TestCardText">{props.text}</Card.Text>
						</Card.Body>
					</Card>
				</Link>
			</LinkContainer>
		</div>
	);
}

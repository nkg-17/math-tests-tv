
import './TestPreviewCard.css';

import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';


export default function TestPreviewCard(props) {
	return (
		<div className="TestPreviewCard">
			<LinkContainer to={`/test/${props.data.id}`}>
				<Link className="text-dec-none">
					<Card>
						<Row className="justify-content-center"><Col>
							<Card.Img className="TestPreviewCardImg" src={props.data.pictureUrl} />
						</Col></Row>
						<Card.Body>
							<Card.Title className="TestPreviewCardTitle">{props.data.name}</Card.Title>
							<Card.Text className="TestPreviewCardText">{props.data.text}</Card.Text>
						</Card.Body>
					</Card>
				</Link>
			</LinkContainer>
		</div>
	);
}

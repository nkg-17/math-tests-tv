
import './TestPreviewCard.css';

import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import React from 'react';
import { Card, Row, Col, Badge } from 'react-bootstrap';


export default function TestPreviewCard(props) {
	return (
		<div className="TestPreviewCard">
			<LinkContainer to={`/test/${props.test.id}`}>
				<Link className="text-dec-none">
					<Card className="h-100">
						{
							(props.test.starred) ? (
								<i className="bi bi-star-fill TestPreviewCardStar" />
							) : (
								null
							)
						}
						
						<Row className="justify-content-center">
							<Col>
								<Card.Img className="TestPreviewCardImg p-2" src={props.test.problem.pictureUrl} />
							</Col>
						</Row>
						<Card.Body className="h-100">
							<Card.Title className="TestPreviewCardTitle">{props.test.name}</Card.Title>
							<Row className="w-100 g-1 mb-1">
									{
										props.test.tags.map((tag) => {
											return (
												<Col className="col-auto" key={tag}>
													<Badge pill bg="secondary">{tag}</Badge>
												</Col>
											);
										})
									}
							</Row>

							<Card.Text className="TestPreviewCardText">{props.test.problem.preface}</Card.Text>
						</Card.Body>
					</Card>
				</Link>
			</LinkContainer>
		</div>
	);
}

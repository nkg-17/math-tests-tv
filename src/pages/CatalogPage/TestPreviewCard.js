import './TestPreviewCard.css';

import React, { memo } from 'react';
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Badge } from 'react-bootstrap';


function TestPreviewCard(props) {
	return (
		<div className="TestPreviewCard">
			<LinkContainer to={`/test/${props.test.id}`}>
				<Link className="text-dec-none">
					<Card className="h-100">
						<Row className="justify-content-center">
							<Col>
								<Card.Img className="TestPreviewCardImg p-2" src={props.test.problem.picture} />
							</Col>
						</Row>
						<Card.Body className="h-100">
							<Card.Title className="TestPreviewCardTitle">{props.test.title}</Card.Title>
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

							<Card.Text className="TestPreviewCardText">
								{
									(props.test.problem.text) ? (
										<>{props.test.problem.text}</>
									) : (
										(props.test.problem.tasks) ? (
											<>{props.test.problem.tasks[0].title} {props.test.problem.tasks[0].text}</>
										) : (
											<>(Без текста)</>
										)
									)
								}
							</Card.Text>
						</Card.Body>
					</Card>
				</Link>
			</LinkContainer>
		</div>
	);
}

export default memo(TestPreviewCard);
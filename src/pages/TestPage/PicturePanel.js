import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import {
	Container,
	Button
} from 'react-bootstrap';


function PicturePanel(props) {
	return (
		<>
			<Container className="TestPicturePanel p-2 border">
				<img 
				src={""} 
				className="TestPicture" alt="" />
			</Container>
			<div className="w-100 py-2 d-flex flex-row-reverse">
				<LinkContainer to={ "/" }><Button variant="light"><i className="bi bi-fullscreen" /></Button></LinkContainer>
			</div>
		</>
	);
}

export default PicturePanel;
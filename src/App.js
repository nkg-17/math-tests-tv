
import './App.css';

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CatalogPage from 	'./pages/CatalogPage';
import TestPage from	 	'./pages/TestPage';
import NotFoundPage from 	'./pages/NotFoundPage';

import Header from 	'./components/Header';


export default function App() {
	return (
		<div className="App">
			<Router basename={process.env.PUBLIC_URL}>
				<Header />
					<Routes>
						<Route exact path="/" element={ <CatalogPage /> } />
						<Route exact path="/test/:id" element={ <TestPage /> } />
						<Route exact path="/404" element={ <NotFoundPage /> } />
						<Route path="*" element={<NotFoundPage />} />
	 				</Routes>
			</Router>
		</div>
	);
}

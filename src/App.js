
import './App.css';

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import TestPage from	'./domains/test/TestPage';
import ErrorPage from 	'./domains/error/ErrorPage';

import Header from 	'./components/Header';


export default function App() {
	return (
		<div className="App">
			<Router basename={process.env.PUBLIC_URL}>
				<Header />
					<Routes>
						<Route exact path="/" element={ <Navigate to="/test" /> } />
						<Route exact path="/test" element={ <TestPage /> } />
						<Route exact path="/error" element={ <ErrorPage /> } />
						<Route path="*" element={<ErrorPage />} />
	 				</Routes>
			</Router>
		</div>
	);
}

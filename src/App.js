
import './App.css';

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CatalogPage from './pages/CatalogPage';
import TestPage from 	'./pages/TestPage';
import Header from 	'./components/Header';


export default function App() {
	return (
		<div className="App">
			<Router basename={process.env.PUBLIC_URL}>
				<Header />
				
				<Routes>
					<Route exact path="/" element={ <CatalogPage /> } />
					<Route path="/test" element={ <TestPage /> } />
				</Routes>
			</Router>
		</div>
	);
}

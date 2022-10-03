
import './App.css';

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Catalog from './pages/Catalog';
import Test from 	'./pages/Test';
import Header from 	'./components/Header';


export default function App() {
	return (
		<div className="App">
			<Router basename={process.env.PUBLIC_URL}>
				<Header />
				
				<Routes>
					<Route exact path="/" element={ <Catalog /> } />
					<Route exact path="/test/<:id>" element={ <Test /> } />
				</Routes>
			</Router>
		</div>
	);
}

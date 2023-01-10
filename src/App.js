
import './App.css';

import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import RoutePaths from './constants/RoutePaths';

import TVTestPage from	'./domains/test-tv/TVTestPage';
import ErrorPage from 	'./domains/error/ErrorPage';


export default function App() {
	return (
		<div className="App">
			<Router>
					<Routes>
						<Route exact path="/index.html" element={ <Navigate to={RoutePaths.ROOT} /> } />
						<Route exact path={RoutePaths.ROOT} element={ <Navigate to={RoutePaths.TEST_TV} /> } />
						<Route exact path={RoutePaths.TEST_TV} element={ <TVTestPage /> } />
						<Route exact path={RoutePaths.ERROR} element={ <ErrorPage /> } />
						<Route path={RoutePaths.ALL} element={<ErrorPage />} />
	 				</Routes>
			</Router>
		</div>
	);
}

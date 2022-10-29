
import './App.css';

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import RoutePaths from './constants/RoutePaths';
import ColorPalette from './constants/ColorPalette';

import TVTestPage from	'./domains/test/TVTestPage';
import ErrorPage from 	'./domains/error/ErrorPage';


export default function App() {
	return (
		<div className="App" style={{backgroundColor: ColorPalette.background}}>
			<Router basename={process.env.PUBLIC_URL}>
					<Routes>
						<Route exact path={RoutePaths.ROOT} element={ <Navigate to={RoutePaths.TEST_TV} /> } />
						<Route exact path={RoutePaths.TEST_TV} element={ <TVTestPage /> } />
						<Route exact path={RoutePaths.ERROR} element={ <ErrorPage /> } />
						<Route path={RoutePaths.ALL} element={<ErrorPage />} />
	 				</Routes>
			</Router>
		</div>
	);
}

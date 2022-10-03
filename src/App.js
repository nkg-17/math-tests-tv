import './App.css';

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Catalog from './components/Catalog';
import Test from './components/Test';
import MyNavbar from './components/MyNavbar';


class App extends React.Component {
	render() {
		return (
			<div className="App">
				<MyNavbar />

				<BrowserRouter basename={process.env.PUBLIC_URL}>
					<Routes>
						<Route path="/" element={<Navigate to="/catalog" />} />
						<Route path="/test" element={<Test />} />
						<Route path="/catalog" element={<Catalog />} />
					</Routes>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;

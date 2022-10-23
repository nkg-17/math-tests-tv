import './App.css';

import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import CatalogPage from 	'./pages/CatalogPage';
// import TestPage from	 	'./pages/TestPage';
// import NotFoundPage from 	'./pages/NotFoundPage';

// import Header from 	'./components/Header';

import TestsAPI from './api/TestsAPI';

export default function App() {
	const [ text, setText ] = useState('loading');

	useEffect(() => {
		TestsAPI.requestTestList().then(
			(list) => setText(list.map((item) => JSON.stringify(item, null, 4)).join('\n')),
			(err) => setText(err)
		);

		return ()=>{};
	});

	return (
		<div className="App">
			<pre style={{ textAlign: "left" }}>{text}</pre>
		</div>
	);
}

/*
<Router basename={process.env.PUBLIC_URL}>
				<Header />
					<Routes>
						<Route exact path="/" element={ <CatalogPage /> } />
						<Route exact path="/test/:id" element={ <TestPage /> } />
						<Route exact path="/404" element={ <NotFoundPage /> } />
						<Route path="*" element={<NotFoundPage />} />
	 				</Routes>
			</Router>
*/
import './App.css';

import React from "react";

import Catalog from './components/Catalog';
import Test from './components/Test';
import MyNavbar from './components/MyNavbar';


class App extends React.Component {

	render() {
		return (
			<div className="App">
				<MyNavbar />
				<Catalog />
				<Test />
			</div>
		);
	}

}

export default App;

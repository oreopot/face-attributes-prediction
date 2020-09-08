import React, { Fragment } from 'react';
import { CssBaseline } from '@material-ui/core';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';

function App() {
	return (
		<Fragment>
			<CssBaseline />
			<Header />
			<Body />
			<Footer />
		</Fragment>
	);
}

export default App;

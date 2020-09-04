import React, { Fragment } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';

function App() {
	return (
		<Fragment>
			<Header />
			<Body />
			<Footer />
		</Fragment>
	);
}

export default App;

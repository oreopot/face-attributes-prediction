import React, { Fragment } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer'

const useStyles = makeStyles((theme) => ({
	root: {
		background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
		// background: 'linear-gradient(45deg, #37ecba 0%, #72afd3 90%)',
		border: 0,
		borderRadius: 3,
		boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
		color: 'white',
		height: 48,
		padding: '0 30px'
	}
}));

function App() {
	const classes = useStyles();
	return (
		<Fragment>
			<Header className={classes.root} />
			<Body />
			{/* Footer */}

		</Fragment>
	);
}

export default App;

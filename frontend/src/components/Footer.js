import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link, Toolbar, Typography, AppBar } from '@material-ui/core';

function Copyright() {
	return (
		<Typography variant='body2' color='textSecondary' align='center'>
			{'Copyright © '}
			<Link color='inherit' href='https://material-ui.com/'>
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	footer: {
		top: 'auto',
		bottom: '0px',
		background: theme.palette.primary.mainGradient,
	},
}));

function Footer(props) {
	const classes = useStyles();
	const { description, title } = props;

	return (
		<>
			<AppBar position='fixed' variant='outlined' className={classes.footer}>
				{/* <Copyright /> */}
				<Toolbar>
					<Typography> Bhaumik Mehta </Typography>
				</Toolbar>
			</AppBar>
		</>
	);
}

export default Footer;

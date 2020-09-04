import React from 'react';
import { Toolbar, AppBar, Typography, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: 'white',
		background: theme.palette.primary.mainGradient,
	},
}));

function Header() {
	const classes = useStyles();
	return (
		<AppBar position='static' variant='primary' className={classes.paper}>
			<Toolbar>
				<Typography> Bhaumik Mehta </Typography>
			</Toolbar>
		</AppBar>
	);
}

export default Header;

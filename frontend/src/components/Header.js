import React from 'react';
import { Toolbar, AppBar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	header: {
		// padding: theme.spacing(2),
		textAlign: "center",
		color: "#black",
		background: theme.palette.primary.main,
		margin: "0px 10px 0px 0px",
		fontWeight: "300",
	},
}));

function Header() {
	const classes = useStyles();
	return (
		<AppBar position='static' variant='outlined' className={classes.header}>
			<Toolbar>
				<Typography> Bhaumik Mehta </Typography>
			</Toolbar>
		</AppBar>
	);
}

export default Header;

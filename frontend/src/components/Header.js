import React from 'react';
import { Toolbar, AppBar, Typography, useTheme } from '@material-ui/core';



function Header() {

	const theme = useTheme();
	return (
		<AppBar position="static" color="primary" style={{ background: theme.palette.primary.mainGradient }}>
			<Toolbar>
				<Typography> Bhaumik Mehta </Typography>
			</Toolbar>
		</AppBar>
	);
}

export default Header;

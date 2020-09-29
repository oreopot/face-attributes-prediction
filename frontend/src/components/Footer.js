import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link, Toolbar, Typography, AppBar, Grid, Divider } from "@material-ui/core";
import { GitHub, LinkedIn } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	footer: {
		top: "auto",
		// width: "auto",
		bottom: "0px",
		background: theme.palette.primary.mainGradient,
	},
	socialIconsRoot: {
		width: "30%",
		border: `1px solid ${theme.palette.divider}`,
		borderRadius: theme.shape.borderRadius,
		"& svg": {
			margin: theme.spacing(0.5),
		},
		"& hr": {
			margin: theme.spacing(0, 0.5),
		},
	},
	linksRoot: {
		"& > * + *": {
			marginLeft: theme.spacing(2),
		},
	},
}));

function SocialLinks() {
	const classes = useStyles();
	return (
		<Grid alignItems='center' container className={classes.socialIconsRoot}>
			<Link
				color='inherit'
				target='_blank'
				rel='noopener'
				href='https://github.com/oreopot/face-attributes-prediction'>
				<GitHub fontSize='large' />
			</Link>
			<Divider orientation='vertical' flexItem />
			<Link color='inherit' target='_blank' rel='noopener' href='https://www.linkedin.com/in/bhaumikmehta/'>
				<LinkedIn fontSize='large' />
			</Link>
		</Grid>
	);
}

function Footer() {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<AppBar position='fixed' variant='outlined' className={classes.footer}>
				<Grid container spacing={2} direction='row' justify='space-between' alignItems='center'>
					<Grid item xs={4}>
						<Toolbar>
							<Typography> Bhaumik Mehta </Typography>
						</Toolbar>
					</Grid>
					<Grid item xs={4}>
						<SocialLinks />
					</Grid>
					<Grid item xs={3}>
						<Toolbar>
							<Typography> Bhaumik Mehta </Typography>
						</Toolbar>
					</Grid>
				</Grid>
			</AppBar>
		</div>
	);
}

export default Footer;

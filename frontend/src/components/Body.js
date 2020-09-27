import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Divider } from "@material-ui/core";
import ImageUpload from "./ImageUpload";
// import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		width: "fit-page",
		border: `1px solid ${theme.palette.divider}`,
		borderRadius: theme.shape.borderRadius,
		backgroundColor: theme.palette.background.paper,
		color: theme.palette.text.secondary,
		"& svg": {
			margin: theme.spacing(1.5),
		},
		"& hr": {
			margin: theme.spacing(0, 0.5),
		},
	},
	paper: {
		height: 140,
		width: 100,
	},
	cont: {
		margin: 0,
		width: "100%",
		height: "86vh",
		background: theme.palette.primary.alternateGradient,
	},
}));

function Body() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Grid container spacing={3} className={classes.cont}>
				<Grid item xs={12} md={9}>
					<ImageUpload />
				</Grid>
				<Divider orientation='vertical' flexItem />
				<Grid item xs={12} md={2}>
					<svg viewBox='0 0 500 500' xmlns='http://www.w3.org/2000/svg' width='60%' height='60%' id='blobSvg'>
						<path
							id='blob'
							d='M458,320.5Q443,391,381,426.5Q319,462,247.5,469.5Q176,477,149,410Q122,343,69.5,296.5Q17,250,50.5,190Q84,130,131.5,81.5Q179,33,247.5,40.5Q316,48,353.5,97.5Q391,147,432,198.5Q473,250,458,320.5Z'
							fill='#fab1a0'></path>
					</svg>
				</Grid>
			</Grid>
		</div>
	);
}

export default Body;

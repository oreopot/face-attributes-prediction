import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Divider } from "@material-ui/core";
import { ModernProfessional } from "../assets/ModernProfessional.js";
import ImageUpload from "./ImageUpload";

// import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		width: "fit-page",
		border: `1px solid ${theme.palette.divider}`,
		borderRadius: theme.shape.borderRadius,
		background: theme.palette.primary.alternateGradient,
		color: theme.palette.text.secondary,
		"& svg": {
			margin: theme.spacing(1),
		},
		"& hr": {
			margin: theme.spacing(0, 0.5),
		},
	},
	cont: {
		margin: 0,
		width: "100%",
		height: "86vh",
	},
}));

function Body() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Grid container spacing={3} className={classes.cont}>
				<Grid item xs={12} md={4}>
					<ModernProfessional />
				</Grid>
				<Divider orientation='vertical' flexItem />
				<Grid item xs={4} md={5}>
					<ImageUpload />
				</Grid>
				<Divider orientation='vertical' flexItem />
				<Grid item xs={12} md={3}></Grid>
			</Grid>
		</div>
	);
}

export default Body;

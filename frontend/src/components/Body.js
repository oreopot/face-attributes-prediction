import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';
import ImageUpload from './ImageUpload';
import { useSpring, animated } from 'react-spring';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		// padding: theme.spacing(2),
		// textAlign: 'center',
		// color: 'white',
		// backgroundColor: '#09C',
		height: 140,
		width: 100,
	},
	cont: {
		margin: 0,
		width: '100%',
		// border: '1px solid red',
		background: theme.palette.primary.alternateGradient,
		// minHeight: '250px',
	},
}));

function Body() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Grid container spacing={3} className={classes.cont}>
				{/* {[0, 1, 2, 3].map((value) => (
					<Grid key={value} item xs={3}>
						<Paper variant='elevation' className={classes.paper}>
							{value}
						</Paper>
					</Grid>
				))} */}
				<Grid item xs={6}>
					<ImageUpload />
				</Grid>
				<Grid item xs={6}>
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

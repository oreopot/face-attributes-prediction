import React, { useEffect, useState, useMemo } from "react";
import { Grid, Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDropzone } from "react-dropzone";
import { Face, Done } from "@material-ui/icons";
import axios from "axios";

const baseStyle = {
	flex: 1,
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	padding: "20px",
	borderWidth: 2,
	borderRadius: 2,
	borderColor: "#eeeeee",
	borderStyle: "dashed",
	// width: "50%",
	// backgroundColor: '#fafafa',
	background: "transparent",
	color: "#bdbdbd",
	outline: "none",
	transition: "border .24s ease-in-out",
};

const container = {
	display: "flex",
	flexDirection: "column",
	fontFamily: "sans-serif",
};

const thumbsContainer = {
	display: "flex",
	flexDirection: "row",
	flexWrap: "wrap",
	marginTop: 16,
};

const thumb = {
	display: "inline-flex",
	borderRadius: 2,
	border: "1px solid #eaeaea",
	marginBottom: 8,
	marginRight: 8,
	width: 150,
	height: 150,
	padding: 4,
	boxSizing: "border-box",
};

const thumbInner = {
	display: "flex",
	minWidth: 0,
	overflow: "hidden",
};

const img = {
	display: "block",
	width: "100%",
	height: "100%",
};

const activeStyle = {
	borderColor: "#2196f3",
};

const acceptStyle = {
	borderColor: "#00e676",
};

const rejectStyle = {
	borderColor: "#ff1744",
};

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		justifyContent: "center",
		flexWrap: "wrap",
		"& > *": {
			margin: theme.spacing(1),
		},
		fontFamily: "'Balsamiq Sans', cursive",
		fontSize: "10px",
		fontWeight: "Bold",
	},
	cont: {
		margin: 0,
		width: "100%",
		height: "84vh",
	},
}));

function ImageUpload() {
	const classes = useStyles();
	const [files, setFiles] = useState([]);
	const [features, setFeatures] = useState(false);
	const [loading, setLoading] = useState(false);
	const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
		accept: "image/*",
		multiple: false,
		onDrop: (acceptedFiles) => {
			setLoading(true);
			const form_data = new FormData();

			setFiles(
				acceptedFiles.map((file) =>
					Object.assign(file, {
						preview: URL.createObjectURL(file),
					})
				)
			);

			acceptedFiles.map((file) => {
				form_data.append("file", file);
				return 1;
			});

			// const instance = axios.create({
			// 	baseURL: "http://localhost:7777",
			// });
			axios
				.post(`/api/upload`, form_data, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				})
				.then((response) => {
					console.log("Axios Success 🥳");
					setFeatures(response.data.data.present);
					setLoading(false);
				})
				.catch((err) => {
					console.log("Axios Failed🚨");
					console.log(err);
				});
		},
	});

	const style = useMemo(
		() => ({
			...baseStyle,
			...(isDragActive ? activeStyle : {}),
			...(isDragAccept ? acceptStyle : {}),
			...(isDragReject ? rejectStyle : {}),
		}),
		[isDragActive, isDragReject, isDragAccept]
	);

	const thumbs = files.map((file) => (
		<div style={thumb} key={file.name}>
			<div style={thumbInner}>
				<img alt='input file' src={file.preview} style={img} />
			</div>
		</div>
	));

	useEffect(
		() => () => {
			// Make sure to revoke the data uris to avoid memory leaks
			files.forEach((file) => URL.revokeObjectURL(file.preview));
		},
		[files]
	);

	return (
		<Grid container direction='column' justify='flex-start' alignItems='center' className={classes.cont}>
			<Grid item>
				<section className={container}>
					<div {...getRootProps({ style, className: "dropzone" })}>
						<input {...getInputProps()} />
						<p style={{ color: "white", letterSpacing: "1px", minWidth: "100%", minHeight: "100%" }}>
							{isDragActive ? "Drop it like it's hot!" : "Click me or drag a file to upload!"}
						</p>
					</div>
					<aside style={thumbsContainer}>{thumbs}</aside>
				</section>
			</Grid>
			<Grid item>
				<div className={classes.root}>
					{loading ? (
						<h1>Loading....</h1>
					) : (
						features &&
						features.map((feature, index) => {
							return (
								<Chip
									key={index}
									icon={<Face />}
									label={feature}
									clickable
									color='primary'
									deleteIcon={<Done />}
								/>
							);
						})
					)}
				</div>
			</Grid>
		</Grid>
	);
}

export default ImageUpload;

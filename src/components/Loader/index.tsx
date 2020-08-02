import { makeStyles, CircularProgress } from "@material-ui/core";
import * as React from "react";

function Loader() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<CircularProgress />
		</div>
	);
}

const useStyles = makeStyles(() => ({
	root: {
		display: "flex",
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		justifyContent: "center",
		alignItems: "center",
	},
}));

export default Loader;

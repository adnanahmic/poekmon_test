import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
}));

interface Props {
	data: any;
}

export default function ListingType(props: Props) {
	const { data } = props;
	const classes = useStyles();
	if (!data) return null;
	return (
		<div className={classes.root}>
			<List component="nav" aria-label="secondary mailbox folders">
				{data.map((item: any, index: number) => (
					<ListItem button key={index}>
						<ListItemText primary={item.name} />
					</ListItem>
				))}
			</List>
		</div>
	);
}

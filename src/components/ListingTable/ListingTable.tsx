import * as React from "react";
import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
// redux
import { Listing } from "model/model";

interface Props {
	list: Listing[];
}

function ListingTable(props: Props) {
	const { list } = props;
	const classes = useStyles();

	const onRowClick = (listing: Listing) => {
		console.log(listing);
	};

	return (
		<Paper className={classes.paper}>
			<div className={classes.tableWrapper}>
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							<TableCell>#</TableCell>
							<TableCell>name</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{list.map((listing, index) => {
							return (
								<TableRow
									key={index}
									hover
									onClick={(event) => onRowClick(listing)}
								>
									<TableCell padding="none">
										{index + 1}
									</TableCell>
									<TableCell padding="none">
										{" "}
										{listing.name}
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</div>
		</Paper>
	);
}

const useStyles = makeStyles({
	paper: {
		width: "100%",
		minWidth: 260,
		display: "inline-block",
	},
	table: {
		width: "100%",
	},
	tableWrapper: {
		overflow: "auto",
		maxHeight: "80%",
	},
});

export default ListingTable;

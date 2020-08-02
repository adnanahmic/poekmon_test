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
	history: any;
	search?: string;
}

function ListingTable(props: Props) {
	const { list, history, search } = props;
	const classes = useStyles();

	const getPokemonId = (url: string) => {
		return Number(url.split("/")[6]);
	};

	const onRowClick = (listing: Listing) => {
		const { url } = listing;
		const id = getPokemonId(url);
		if (id) {
			history.push(`/pokemon/${id}`);
		}
	};
	if (!list) return null;
	const filteredList = search
		? list.filter((item) => item.name.indexOf(search) !== -1)
		: list;
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
						{filteredList.map((listing) => {
							return (
								<TableRow
									key={getPokemonId(listing.url)}
									hover
									onClick={(event) => onRowClick(listing)}
								>
									<TableCell>
										{getPokemonId(listing.url)}
									</TableCell>
									<TableCell> {listing.name}</TableCell>
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

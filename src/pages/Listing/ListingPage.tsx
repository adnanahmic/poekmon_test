import { Button, Grid, Typography } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { WithStyles, createStyles, withStyles } from "@material-ui/core/styles";

import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { bindActionCreators } from "redux";
// redux
import { Listing } from "model/model";
import * as listingActions from "redux/listing/listingActions";
import { RootState } from "redux/rootReducer";

import ListingTable from "components/ListingTable/ListingTable";

const styles = (theme: Theme) =>
	createStyles({
		root: {
			padding: 20,
			[theme.breakpoints.down("md")]: {
				paddingTop: 50,
				paddingLeft: 15,
				paddingRight: 15,
			},
		},

		buttonContainer: {
			width: "100%",
			display: "flex",
			justifyContent: "flex-end",
		},

		button: {
			marginBottom: 15,
		},
	});

interface Props extends RouteComponentProps<void>, WithStyles<typeof styles> {
	listings: Listing[];
	offset: number;
	limit: number;
	count: number;
	next: string | null;
	previous: string | null;
	loading: boolean;
	actions: typeof listingActions;
}

class ListingPage extends React.Component<Props> {
	componentDidMount() {
		const { offset, limit, actions } = this.props;
		const query = {
			offset,
			limit,
		};
		actions.getListingAction(query);
	}
	nextPage = () => {
		const { offset, limit, next, count, actions } = this.props;
		if (count > 0 && next) return;
		const query = {
			offset: offset + 20,
			limit,
		};
		actions.getListingAction(query);
	};

	prevPage = () => {
		const { offset, limit, previous, count, actions } = this.props;
		if (count > 0 && previous) return;
		const query = {
			offset: offset - 20,
			limit,
		};
		actions.getListingAction(query);
	};
	render() {
		const { listings, previous, classes } = this.props;

		return (
			<Grid container className={classes.root}>
				<Grid item xs={6}></Grid>
				<Grid item xs={6}>
					<div className={classes.buttonContainer}>
						{previous && (
							<Button
								className={classes.button}
								variant="contained"
								color="secondary"
								onClick={this.prevPage}
							>
								Previous Page
							</Button>
						)}{" "}
						<Button
							className={classes.button}
							variant="contained"
							color="secondary"
							onClick={this.nextPage}
						>
							Next Page
						</Button>
					</div>
				</Grid>
				<Grid item xs={12}>
					<ListingTable list={listings} />
				</Grid>
			</Grid>
		);
	}
}

function mapStateToProps(state: RootState) {
	return {
		listings: state.listing.list,
		loading: state.listing.loading,
		offset: state.listing.offset,
		limit: state.listing.limit,
		next: state.listing.next,
		previous: state.listing.previous,
	};
}

function mapDispatchToProps(dispatch: any) {
	return {
		actions: bindActionCreators(listingActions as any, dispatch),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(ListingPage));
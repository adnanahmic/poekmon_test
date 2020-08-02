import { Button, Grid, TextField } from "@material-ui/core";
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
import Loader from "components/Loader";

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
			"& > *": {
				margin: theme.spacing(1),
			},
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
	state = {
		search: "",
	};
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

	fetchAll = () => {
		const { actions } = this.props;
		const query = {
			offset: 0,
			limit: 1000,
		};
		actions.getListingAction(query);
	};

	handleChange = (e: any) => {
		this.setState({ search: e.target.value });
	};
	render() {
		const { listings, previous, classes, loading, history } = this.props;

		return (
			<Grid container className={classes.root}>
				{loading && <Loader />}
				<Grid item xs={12} md={6}>
					<TextField
						fullWidth
						id="search"
						label="Search pokemon by name"
						onChange={this.handleChange}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<div className={classes.buttonContainer}>
						<Button
							variant="contained"
							color="primary"
							onClick={this.fetchAll}
						>
							Fetch All
						</Button>
						{previous && (
							<Button
								variant="contained"
								color="secondary"
								onClick={this.prevPage}
							>
								Previous
							</Button>
						)}{" "}
						<Button
							variant="contained"
							color="secondary"
							onClick={this.nextPage}
						>
							Next
						</Button>
					</div>
				</Grid>
				<Grid item xs={12}>
					<ListingTable
						list={listings}
						history={history}
						search={this.state.search}
					/>
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

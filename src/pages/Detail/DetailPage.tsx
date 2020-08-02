import { Grid, Dialog, Button } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { WithStyles, createStyles, withStyles } from "@material-ui/core/styles";

import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { bindActionCreators } from "redux";
// redux
import { createApiCall, typeRoute, MethodType } from "services/Api";
import * as detailActions from "redux/detail/detailActions";
import { RootState } from "redux/rootReducer";

import Loader from "components/Loader";
import DetailCard from "components/Detail";
import ListingTable from "components/ListingTable/ListingTable";

const styles = (theme: Theme) =>
	createStyles({
		root: {
			padding: 20,
			justifyContent: "center",
			alignItems: "center",
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
	data: any;
	loading: boolean;
	actions: typeof detailActions;
	match: any;
}

interface State {
	pokemon: any;
	open: boolean;
	loading: boolean;
}

class DetailPage extends React.Component<Props, State> {
	state = {
		pokemon: [],
		open: false,
		loading: false,
	};
	componentDidMount() {
		const { actions, match } = this.props;
		actions.getDetailAction(match.params.id);
	}

	componentDidUpdate(prevProps: any, prevState: any) {
		console.log(prevState, prevProps);
		const { actions, match } = this.props;
		if (prevProps.match && prevProps.match.params.id !== match.params.id) {
			actions.getDetailAction(match.params.id);
			this.setState({ open: false });
		}
	}

	getTypeId = (url: string) => {
		return Number(url.split("/")[6]);
	};

	onTypeCLick = async (type: any) => {
		try {
			this.setState({ loading: true });
			const id = this.getTypeId(type.url);
			const resp = await createApiCall({
				method: MethodType.GET,
				url: `${typeRoute}${id}`,
				data: undefined,
			});
			const pokemon = resp.pokemon.map((item: any) => ({
				name: item.pokemon.name,
				url: item.pokemon.url,
			}));
			this.setState({
				pokemon,
				open: true,
				loading: false,
			});
		} catch (err) {
			this.setState({ loading: false });
			console.log(err);
		}
	};

	toggleModal = () => {
		this.setState((state) => ({ open: !state.open }));
	};

	handleBack = () => {
		this.props.history.push("/");
	};

	render() {
		const { classes, loading, data, history } = this.props;
		return (
			<Grid container className={classes.root}>
				{(loading || this.state.loading) && <Loader />}
				<Grid item xs={12}>
					<div className={classes.buttonContainer}>
						<Button
							className={classes.button}
							variant="contained"
							color="secondary"
							onClick={this.handleBack}
						>
							Back to main page
						</Button>
					</div>
				</Grid>
				<Grid item>
					<DetailCard data={data} onTypeCLick={this.onTypeCLick} />
				</Grid>
				<Dialog
					open={this.state.open}
					onClose={this.toggleModal}
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
				>
					<ListingTable list={this.state.pokemon} history={history} />
				</Dialog>
			</Grid>
		);
	}
}

function mapStateToProps(state: RootState) {
	return {
		data: state.detail.data,
	};
}

function mapDispatchToProps(dispatch: any) {
	return {
		actions: bindActionCreators(detailActions as any, dispatch),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(DetailPage));

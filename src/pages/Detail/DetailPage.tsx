import { Grid } from "@material-ui/core";
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
}

class DetailPage extends React.Component<Props, State> {
	state = {
		pokemon: [],
		open: false,
	};
	componentDidMount() {
		const { actions, match } = this.props;
		actions.getDetailAction(match.params.id);
	}

	getTypeId = (url: string) => {
		return Number(url.split("/")[6]);
	};

	onTypeCLick = async (type: any) => {
		try {
			const id = this.getTypeId(type.url);
			const resp = await createApiCall({
				method: MethodType.GET,
				url: `${typeRoute}${id}`,
				data: undefined,
			});
			this.setState({
				pokemon: resp.pokemon,
				open: true,
			});
		} catch (err) {
			console.log(err);
		}
	};

	render() {
		const { classes, loading, data } = this.props;

		return (
			<Grid container className={classes.root}>
				{loading && <Loader />}
				<Grid item>
					<DetailCard data={data} onTypeCLick={this.onTypeCLick} />
				</Grid>
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

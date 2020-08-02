import * as React from "react";
import {
	Typography,
	Card,
	CardHeader,
	Button,
	CardContent,
	CardActions,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { red } from "@material-ui/core/colors";
// redux
import { Detail } from "model/model";

interface Props {
	data: any;
	onTypeCLick: Function;
}

function DetailCard(props: Props) {
	const { data, onTypeCLick } = props;
	const classes = useStyles();

	if (!data) return null;
	return (
		<Card className={classes.root}>
			<CardHeader
				title={data.name}
				className={classes.cardHeader}
				titleTypographyProps={{ align: "center" }}
			/>
			<CardContent>
				<div className={classes.info}>
					<ul>
						<Typography
							component="li"
							variant="subtitle1"
							align="center"
							key="id"
						>
							id: {data.id}
						</Typography>
						<Typography
							component="li"
							variant="subtitle1"
							align="center"
							key="height"
						>
							height: {data.height}
						</Typography>
						<Typography
							component="li"
							variant="subtitle1"
							align="center"
							key="width"
						>
							weight: {data.weight}
						</Typography>
					</ul>
				</div>
				<div>
					<img src={data.sprites.front_default} />
					<img src={data.sprites.back_default} />
				</div>
			</CardContent>
			<CardActions style={{ justifyContent: "center" }}>
				{data.types.map((type: any) => (
					<Button
						variant="contained"
						color="primary"
						key={type.slot}
						onClick={() => onTypeCLick(type.type)}
					>
						{type.type.name}
					</Button>
				))}
			</CardActions>
		</Card>
	);
}

const useStyles = makeStyles((theme) => ({
	"@global": {
		ul: {
			margin: 0,
			padding: 0,
			listStyle: "none",
		},
	},
	root: {
		maxWidth: 345,
	},
	cardHeader: {
		backgroundColor: "#eeeeee",
	},
	info: {
		display: "flex",
		justifyContent: "center",
		alignItems: "baseline",
	},
	avatar: {
		backgroundColor: red[500],
	},
}));

export default DetailCard;

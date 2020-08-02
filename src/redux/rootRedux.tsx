import { Typography } from "@material-ui/core";
import * as React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "../App";
import configureStore from "./configureStore";
import Loader from "../components/Loader";

const { persistor, store } = configureStore();

function ReduxRoot() {
	return (
		<Provider store={store}>
			<PersistGate loading={<Loader />} persistor={persistor}>
				<App />
			</PersistGate>
		</Provider>
	);
}

export { store };

export default ReduxRoot;

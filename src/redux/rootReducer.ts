import { History } from "history";
import { combineReducers } from "redux";
import { routerReducer, RouterState } from "react-router-redux";

import {
	listingReducer,
	ListingReducerType,
} from "redux/listing/listingReducer";

import { detailReducer, DetailReducerType } from "redux/detail/detailReducer";

export interface RootState {
	listing: ListingReducerType;
	detail: DetailReducerType;
	routerReducer: RouterState;
}

export default (history: History) =>
	combineReducers({
		listing: listingReducer,
		detail: detailReducer,
		routerReducer,
	});

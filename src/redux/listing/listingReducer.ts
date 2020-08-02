import { Action, ActionType, Listing } from "model/model";
import createReducer from "../createReducer";

export interface ListingReducerType {
	list: Listing[];
	loading: boolean;
	error?: string;
	offset: number;
	limit: number;
	count: number;
	next: string | null;
	previous: string | null;
}
const defaultState: ListingReducerType = {
	list: [],
	loading: false,
	error: undefined,
	offset: 0,
	limit: 20,
	count: 0,
	next: null,
	previous: null,
};

export const listingReducer = createReducer<ListingReducerType>(defaultState, {
	[ActionType.LISTING_REQUEST](
		state: ListingReducerType,
		action: Action<Listing[]>
	) {
		return {
			...state,
			loading: true,
		};
	},

	[ActionType.LISTING_REQUEST_ERROR](
		state: ListingReducerType,
		action: Action<any>
	) {
		return {
			...state,
			loading: false,
			error: action.payload,
		};
	},

	[ActionType.LISTING_REQUEST_SUCCESS](
		state: ListingReducerType,
		action: Action<Listing[]>
	) {
		return {
			...state,
			loading: false,
			...action.payload,
		};
	},
});

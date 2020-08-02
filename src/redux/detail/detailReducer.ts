import { Action, ActionType, Detail } from "model/model";
import createReducer from "../createReducer";

export interface DetailReducerType {
	data: any;
	loading: boolean;
	error?: string;
}
const defaultState: DetailReducerType = {
	data: null,
	loading: false,
	error: undefined,
};

export const detailReducer = createReducer<DetailReducerType>(defaultState, {
	[ActionType.DETAIL_REQUEST](
		state: DetailReducerType,
		action: Action<Detail>
	) {
		return {
			...state,
			loading: true,
		};
	},

	[ActionType.DETAIL_REQUEST_ERROR](
		state: DetailReducerType,
		action: Action<any>
	) {
		return {
			...state,
			loading: false,
			error: action.payload,
		};
	},

	[ActionType.DETAIL_REQUEST_SUCCESS](
		state: DetailReducerType,
		action: Action<Detail>
	) {
		return {
			...state,
			loading: false,
			data: action.payload,
		};
	},
});

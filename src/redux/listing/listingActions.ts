import { ActionType } from "model/model";

export const getListingAction = (payload?: {
	offset: number;
	limit: number;
}) => {
	return {
		type: ActionType.LISTING_REQUEST,
		payload,
	};
};

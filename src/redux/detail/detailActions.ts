import { ActionType } from "model/model";

export const getDetailAction = (payload: number) => {
	return {
		type: ActionType.DETAIL_REQUEST,
		payload,
	};
};

import { put, takeLatest, fork, call } from "redux-saga/effects";

import { createApiCall, listingRoute, MethodType } from "services/Api";
import { ActionType } from "model/model";

function* getListingSaga({
	payload,
}: {
	payload: { offset: number; limit: number };
}) {
	try {
		const response = yield call(createApiCall, {
			method: MethodType.GET,
			url: `${listingRoute}${
				payload
					? `?offset=${payload.offset}&limit=${payload.limit}`
					: ""
			}`,
			data: undefined,
			auth: true,
		});
		yield put({
			type: ActionType.LISTING_REQUEST_SUCCESS,
			payload: {
				list: response.results,
				count: response.count,
				next: response.next,
				previous: response.previous,
				offset: payload.offset,
				limit: payload.limit,
			},
		});
	} catch (error) {
		yield put({ type: ActionType.LISTING_REQUEST_ERROR, payload: error });
	}
}
function* onLoginSubmitWatcher() {
	yield takeLatest(ActionType.LISTING_REQUEST as any, getListingSaga);
}

export default [fork(onLoginSubmitWatcher)];

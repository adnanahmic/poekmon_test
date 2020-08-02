import { put, takeLatest, fork, call } from "redux-saga/effects";

import { createApiCall, listingRoute, MethodType } from "services/Api";
import { ActionType } from "model/model";

function* getDetailSaga({
	payload,
}: {
	payload: { offset: number; limit: number };
}) {
	try {
		const response = yield call(createApiCall, {
			method: MethodType.GET,
			url: `${listingRoute}${payload}`,
			data: undefined,
		});
		yield put({
			type: ActionType.DETAIL_REQUEST_SUCCESS,
			payload: response,
		});
	} catch (error) {
		yield put({ type: ActionType.DETAIL_REQUEST_ERROR, payload: error });
	}
}
function* onDetailSubmitWatcher() {
	yield takeLatest(ActionType.DETAIL_REQUEST as any, getDetailSaga);
}

export default [fork(onDetailSubmitWatcher)];

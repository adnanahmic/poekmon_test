import { all } from "redux-saga/effects";

import listinSagas from "redux/listing/listingSaga";
import detailSagas from "redux/detail/detailSaga";

export default function* startForman() {
	yield all([...listinSagas, ...detailSagas]);
}

import { takeLatest, takeEvery } from "redux-saga/effects";
import { INITIAL_LOAD_TOKEN, GET_AUTHENTICATION, REFRESH_ACCESS_TOKEN } from "../actions/actions";

import initialLoadToken from "./initialLoadToken";
import getAuthentification from "./getAuthentification";
import refreshAcessToken from "./refreshAcessToken";

export default function* saga() {
    yield takeLatest(INITIAL_LOAD_TOKEN, initialLoadToken);
    yield takeEvery(GET_AUTHENTICATION, getAuthentification);
    yield takeEvery(REFRESH_ACCESS_TOKEN, refreshAcessToken);
}

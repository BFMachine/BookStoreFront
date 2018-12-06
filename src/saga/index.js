import { takeLatest, takeEvery } from "redux-saga/effects";
import { INITIAL_LOAD_TOKEN, GET_AUTHENTICATION, REFRESH_ACCESS_TOKEN, GET_ORDERS } from "../actions/actions";

import initialLoadToken from "./initialLoadToken";
import getAuthentication from "./getAuthentication";
import refreshAccessToken from "./refreshAccessToken";
import getOrders from "./getOrders";

export default function* saga() {
    yield takeLatest(INITIAL_LOAD_TOKEN, initialLoadToken);
    yield takeEvery(GET_AUTHENTICATION, getAuthentication);
    yield takeEvery(REFRESH_ACCESS_TOKEN, refreshAccessToken);
    yield takeEvery(GET_ORDERS, getOrders);
}

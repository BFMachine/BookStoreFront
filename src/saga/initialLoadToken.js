import { put } from "redux-saga/effects";

import isExpTokenValid from "../modules/isExpTokenValid";
import * as actions from "../actions/actions";

export default function* initialLoadToken() {

    let refreshToken = localStorage.getItem("RefreshT");
    if (!isExpTokenValid(refreshToken))
        refreshToken = "";

    yield put(actions.actionSetTokens({
        accessToken: "",
        refreshToken
    }));

    if(refreshToken !== "") {
        yield put(actions.actionRefreshAccessToken());
    }

    yield put(actions.actionGetAuthors());
    yield put(actions.actionGetBooks());
}

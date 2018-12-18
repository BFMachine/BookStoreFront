import { put } from "redux-saga/effects";

import isExpTokenValid from "../modules/isExpTokenValid";
import { actionSetTokens, actionRefreshAccessToken, actionGetBooks, actionGetAuthors } from "../actions/actions";

export default function* initialLoadToken() {

    let refreshToken = localStorage.getItem("RefreshT");
    if (!isExpTokenValid(refreshToken))
        refreshToken = "";

    yield put(actionSetTokens({
        accessToken: "",
        refreshToken
    }));

    if(refreshToken !== "") {
        yield put(actionRefreshAccessToken());
    }

    yield put(actionGetAuthors());
    yield put(actionGetBooks());
}

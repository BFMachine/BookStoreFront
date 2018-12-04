import { put } from "redux-saga/effects";

import isExpTokenValid from "../modules/isExpTokenValid";
import { actionSetTokens } from "../actions/actions";

export default function* initialLoadToken() {
    // initail load refresh token
    let refreshToken = localStorage.getItem("RefreshT");
    if (!isExpTokenValid(refreshToken))
        refreshToken = "";

    yield put(actionSetTokens({
        accessToken: "",
        refreshToken
    }));
}

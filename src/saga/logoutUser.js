import { put } from "redux-saga/effects";

import { actionSetTokens, actionSetAuthUser } from "../actions/actions";

export default function* logoutUser() {

  localStorage.removeItem("RefreshT");

  yield put(actionSetTokens({
    accessToken: "",
    refreshToken: ""
  }));

  yield put(actionSetAuthUser(false));
}

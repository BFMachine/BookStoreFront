import { put } from "redux-saga/effects";

import * as actions from "../actions/actions";

export default function* logoutUser() {

  localStorage.removeItem("RefreshT");

  yield put(actions.actionSetTokens({
    accessToken: "",
    refreshToken: ""
  }));

  yield put(actions.actionSetAuthUser(false)); 
  yield put(actions.actionSetCart([]));
  yield put(actions.actionSetFavorite([]));
  yield put(actions.actionSetOrders([]));

}

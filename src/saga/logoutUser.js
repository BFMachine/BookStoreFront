import { put } from "redux-saga/effects";

import { actionSetTokens, actionSetAuthUser, actionSetCart, actionSetFavorite, actionSetOrders } from "../actions/actions";

export default function* logoutUser() {

  localStorage.removeItem("RefreshT");

  yield put(actionSetTokens({
    accessToken: "",
    refreshToken: ""
  }));

  yield put(actionSetAuthUser(false)); 
  yield put(actionSetCart([]));
  yield put(actionSetFavorite([]));
  yield put(actionSetOrders([]));

}

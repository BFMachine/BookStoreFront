import { put, call } from "redux-saga/effects";
import * as jwt from "jsonwebtoken";

import { actionSetAuthUser, actionSetAuthenticationError, actionSetTokens, 
    actionSetCart, actionSetFavorite, actionSetOrders } from "../actions/actions";

import config from "../config";

export default function* createNewUser({address, email, name, password, phone, role }) {

  try{
    const answer = yield call(fetch, config.SERVER + "users", {
      method: "post",
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          //"Authorization": "Bearer " + tokens.accessToken
      },
      body: JSON.stringify({ email, password, full_name: name, address, phone, role })
    });

    if(!answer.ok) {
      if (answer.status === 404 || answer.status === 401){
        const answerJson = yield answer.json();
        throw new Error(answerJson);
      }
      throw new Error("Ошибка ответа сервера");
    }

    const responseBody = yield answer.json();
    const resJson = JSON.parse(responseBody);
    const tokens = { 
      accessToken: resJson.accessToken, 
      refreshToken: resJson.refreshToken
    };

    console.log(`Server return new tokens: ${tokens.accessToken} ${tokens.refreshToken}`);

    localStorage.setItem("RefreshT", tokens.refreshToken);
    yield put(actionSetTokens(tokens));
    
    const decToken = jwt.decode(tokens.accessToken, {complete: false});
    yield put(actionSetAuthUser(true, decToken.id, decToken.email, decToken.role, resJson.full_name, resJson.address, resJson.phone));
    yield put(actionSetCart([]));
    yield put(actionSetFavorite([]));
    yield put(actionSetOrders([]));

  } catch (error) {
      
      console.log(`auth request throw error ${error.message}`);

      if( error.name !== "Error" ) {
          error.message = "Ошибка запроса сервера";
      }
      yield put(actionSetAuthenticationError(error.message));
  }
}

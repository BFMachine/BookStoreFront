import { put, call, select } from "redux-saga/effects";
import { actionSetCart, actionSetFavorite } from "../actions/actions";

import config from "../config";

const getTokens = state => state.tokens;
const getAuthentications = state => state.authentications;

export function* getCart() {

    let tokens = yield select(getTokens);
    let auth = yield select(getAuthentications);

    try{
        const answer = yield call(fetch, config.SERVER + "users/orders/cart/" + auth.id, {
            method: "get",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + tokens.accessToken
            }
        });

        if(!answer.ok) {
            throw new Error(`status: ${answer.status} ${answer.statusText}`);
        }

        const responseBody = yield answer.json();
        const userOrdersDetailed = JSON.parse(responseBody);
        yield put(actionSetCart(userOrdersDetailed));

    } catch (error) {
        console.log(`server response error ${error}`); 
    }
}

export function* getFavorite() {

  let tokens = yield select(getTokens);
  let auth = yield select(getAuthentications);

  try{
      const answer = yield call(fetch, config.SERVER + "users/orders/favorite/" + auth.id, {
          method: "get",
          headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Authorization": "Bearer " + tokens.accessToken
          }
      });

      if(!answer.ok) {
          throw new Error(`status: ${answer.status} ${answer.statusText}`);
      }

      const responseBody = yield answer.json();
      const userOrdersDetailed = JSON.parse(responseBody);
      yield put(actionSetFavorite(userOrdersDetailed));

  } catch (error) {
      console.log(`server response error ${error}`);
  }
}

import { put, call, select } from "redux-saga/effects";

import { actionGetCart } from "../actions/actions";
import config from "../config";

const getTokens = state => state.tokens;
    
export function* addToCartOnServer({book}) {

  let tokens = yield select(getTokens);

  try{
    const answer = yield call(fetch, config.SERVER + "carts", {
      method: "post",
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + tokens.accessToken
      },
      body: JSON.stringify({ id: book.id })
    });

    if(!answer.ok) {
      throw new Error("Ошибка ответа сервера");
    }

    yield put(actionGetCart());

  } catch (error) {
      console.log(`error in add to cart method ${error.message}`);
  }
}


export function* deleteFromCartOnServer({book}) {

  let tokens = yield select(getTokens);
  
  try{
    const answer = yield call(fetch, config.SERVER + "carts/" + book.id, {
      method: "delete",
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + tokens.accessToken
      }
    });

    if(!answer.ok) {
      throw new Error("Ошибка ответа сервера");
    }

    yield put(actionGetCart());

  } catch (error) {
      console.log(`error in add to cart method ${error.message}`);
  }
}

export function* deleteAllCartOnServer() {

  let tokens = yield select(getTokens);
  
  try{
    const answer = yield call(fetch, config.SERVER + "carts/", {
      method: "delete",
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + tokens.accessToken
      }
    });

    if(!answer.ok) {
      throw new Error("Ошибка ответа сервера");
    }

    yield put(actionGetCart());

  } catch (error) {
      console.log(`error in add to cart method ${error.message}`);
  }
}


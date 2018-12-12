import { put, call, select } from "redux-saga/effects";

import { actionGetFavorite } from "../actions/actions";
import config from "../config";

const getTokens = state => state.tokens;
    
export function* addToFavoriteOnServer({book}) {

  let tokens = yield select(getTokens);

  try{
    const answer = yield call(fetch, config.SERVER + "favorites", {
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

    yield put(actionGetFavorite());

  } catch (error) {
      console.log(`error in add to favorite method ${error.message}`);
  }
}


export function* deleteFromFavoriteOnServer({book}) {

  let tokens = yield select(getTokens);
  
  try{
    const answer = yield call(fetch, config.SERVER + "favorites/" + book.id, {
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

    yield put(actionGetFavorite());

  } catch (error) {
      console.log(`error in add to favorite method ${error.message}`);
  }
}

export function* deleteAllFavoriteOnServer() {

  let tokens = yield select(getTokens);
  
  try{
    const answer = yield call(fetch, config.SERVER + "favorites/", {
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

    yield put(actionGetFavorite());

  } catch (error) {
      console.log(`error in add to favorite method ${error.message}`);
  }
}


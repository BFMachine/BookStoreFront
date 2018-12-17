import { put, call, select } from "redux-saga/effects";

import { actionGetFavorite } from "../actions/actions";
import config from "../config";

const getTokens = state => state.tokens;
const getAuthentications = state => state.authentications;
const getFavorite = state => state.favorite;


export function* addToFavoriteOnServer(books) {

  let tokens = yield select(getTokens);
  let auth = yield select(getAuthentications);
  let favorite = yield select(getFavorite);

  // if not authorized and store in localStorage
  if(auth.authorized === false) {
    localStorage.setItem("Favorite", JSON.stringify(favorite));
    yield put(actionGetFavorite());
    return;
  }

  try{
    const answer = yield call(fetch, config.SERVER + "favorites", {
      method: "post",
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + tokens.accessToken
      },
      body: JSON.stringify({id : [ ...books.book ] })
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
  let auth = yield select(getAuthentications);
  let favorite = yield select(getFavorite);

  // if not authorized and store in localStorage
  if(auth.authorized === false) {
    localStorage.setItem("Favorite", JSON.stringify(favorite));
    yield put(actionGetFavorite());
    return;
  }
  
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
  let auth = yield select(getAuthentications);
  
  // if not authorized and store in localStorage
  if(auth.authorized === false) {
    localStorage.removeItem("Favorite");
    yield put(actionGetFavorite());
    return;
  }
  
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


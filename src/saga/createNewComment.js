import { put, call, select } from "redux-saga/effects";

import { actionGetBookComments } from "../actions/actions";

import config from "../config";

const getTokens = state => state.tokens;


export default function* createNewComment({ book_id, commenter_name, content }) {

  const tokens = yield select(getTokens);
  
  try{
    
    let answer = yield call(fetch, config.SERVER + "comments/" + book_id, {
      method: "post",
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + tokens.accessToken
      },
      body: JSON.stringify({
        commenter_name, 
        content
       })
    });

    if(!answer.ok) {
      throw new Error("Ошибка ответа сервера");
    }
        
    yield put(actionGetBookComments(book_id));

  } catch (error) {
      console.log(`auth request throw error ${error.message}`);
  }
  
}


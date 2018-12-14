import { put, call, select } from "redux-saga/effects";

import { actionGetBooks } from "../actions/actions";

import config from "../config";

const getTokens = state => state.tokens;

export default function* createNewBook({title, author, description, price, rank, category, coverFile, fragmentFile}) {
  
  const tokens = yield select(getTokens);
  
  try{
    
    let answer = yield call(fetch, config.SERVER + "books", {
      method: "post",
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + tokens.accessToken
      },
      body: JSON.stringify({ title, author, price, rank, category, description })
    });

    if(!answer.ok) {
      throw new Error("Ошибка ответа сервера");
    }
    
    const response = yield answer.json();
    
    for(let i = 0; i < coverFile.length; i++) {
      yield uploadFile(coverFile[i], response.book_id, "cover");
    }

    if(fragmentFile.length) {
      yield uploadFile(fragmentFile[0], response.book_id, "text");
    }
    
    yield put(actionGetBooks());

  } catch (error) {
      console.log(`auth request throw error ${error.message}`);
  }
}


function* uploadFile(file, book_id, type) {

  const tokens = yield select(getTokens);

  const data = new FormData();
  data.append("file", file);
  data.append("book_id", book_id);
  data.append("type", type);

  try {
 
    const answer = yield call(fetch, config.SERVER + "files", {
      method: "post",
      headers: {
          "Accept": "application/json",
          "Authorization": "Bearer " + tokens.accessToken
      },
      body: data
    });
   
    if(!answer.ok) {
      throw new Error("Ошибка ответа сервера");
    }
 
  }
  catch (error) {
    console.log(`auth request throw error ${error.message}`);
  }
}

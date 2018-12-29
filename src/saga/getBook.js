import { put, call } from "redux-saga/effects";
import { actionSetComments, actionAddBookToCache } from "../actions/actions";

import config from "../config";


export default function* getBook({book_id}) {

    try{
        const answer = yield call(fetch, config.SERVER + "books/" + book_id, {
            method: "get",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

        if(!answer.ok) {
            throw new Error(`status: ${answer.status} ${answer.statusText}`);
        }

        const { book } = yield answer.json();

        // check if no any cover
        const defaultCover = {
          id: 0,
          name: "images/empty.png", 
          type: "cover"
        };

        let foundCover = false;
        
        book.Files.forEach((item) => {
            if(item.type === "cover") {
              foundCover = true;
            }
        });
          
        if(!foundCover) {
          book.Files.push(defaultCover);
        }

        yield put(actionAddBookToCache(book));
        yield put(actionSetComments(book.Comments));

    } catch (error) {
        console.log(`server response error ${error}`);
    }
}

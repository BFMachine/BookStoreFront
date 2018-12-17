import { put, call } from "redux-saga/effects";
import { actionSetBooks } from "../actions/actions";

import config from "../config";


export default function* getBooks() {

    try{
        const answer = yield call(fetch, config.SERVER + "books", {
            method: "get",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        });

        if(!answer.ok) {
            throw new Error(`status: ${answer.status} ${answer.statusText}`);
        }

        const { books } = yield answer.json();

        // check if no any cover
        const defaultCover = {
          id: 0,
          name: "images/empty.png", 
          type: "cover"
        };

        books.forEach((item) => {
          let foundCover = false;

          item.Files.forEach((item) => {
            if(item.type === "cover") {
              foundCover = true;
            }
          });
          
          if(!foundCover) {
            item.Files.push(defaultCover);
          }
        });

        yield put(actionSetBooks(books));

    } catch (error) {
        console.log(`server response error ${error}`);
    }
}

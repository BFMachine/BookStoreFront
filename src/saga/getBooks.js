import { put, call, select } from "redux-saga/effects";
import { actionSetBooks, actionSetPageTotal } from "../actions/actions";

import config from "../config";

const getFilter = state => state.filter;
const getPages = state => state.pages;


export default function* getBooks() {

    let params = yield select(getFilter);
    let pages = yield select(getPages);

    if(params.category === 0) {
        delete params.category;
    }
    if(params.rank === "0") {
        delete params.rank;
    }
    if(params.author === "") {
        delete params.author;
    }

    params.page_number = pages.page;
    params.page_size = pages.size; 

    let query = Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');

    try{
        const answer = yield call(fetch, config.SERVER + "books?" + query, {
            method: "get",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        });

        if(!answer.ok) {
            throw new Error(`status: ${answer.status} ${answer.statusText}`);
        }

        const { books, max_pages } = yield answer.json();

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

        yield put(actionSetPageTotal(max_pages));
        yield put(actionSetBooks(books));

    } catch (error) {
        console.log(`server response error ${error}`);
    }
}

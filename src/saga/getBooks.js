import { put, call, select } from "redux-saga/effects";
import * as actions from "../actions/actions";

import config from "../config";

const getFilter = state => state.filter;
const getPages = state => state.pages;
const getSearch = state => state.search;


export default function* getBooks() {

    let params = {...yield select(getFilter)};
    let pages = yield select(getPages);
    const search = yield select(getSearch);

    if(params.category === actions.CATEGORY_ALL) {
        delete params.category;
    }
    if(params.rank === actions.RANK_ALL) {
        delete params.rank;
    }
    if(params.author === "") {
        delete params.author;
    }
    if(params.sort === actions.SORT_BY_ALL) {
        delete params.sort;
        delete params.direction;
    } 

    if(pages.size > 1) {
        params.page_size = pages.size;
    } 
    params.page_number = pages.page;

    let query = Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');

    const pathString = search.search ? "books/search" + search.string + "&" : "books?";
   

    try{
        const answer = yield call(fetch, config.SERVER + pathString + query, {
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

        yield put(actions.actionSetPageTotal(max_pages));
        yield put(actions.actionSetBooks(books));

    } catch (error) {
        console.log(`server response error ${error}`);
    }
}

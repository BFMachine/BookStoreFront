import { put, call } from "redux-saga/effects";
import { actionSetAuthors } from "../actions/actions";

import config from "../config";


export default function* getAuthors() {

  try{
        const answer = yield call(fetch, config.SERVER + "authors", {
            method: "get",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        });

        if(!answer.ok) {
            throw new Error(`status: ${answer.status} ${answer.statusText}`);
        }

        const authors = yield answer.json();
        yield put(actionSetAuthors(authors.map(item => item.DISTINCT)));

    } catch (error) {
        console.log(`server response error ${error}`);
    }
}

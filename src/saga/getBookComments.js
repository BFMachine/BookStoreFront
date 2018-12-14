import { put, call } from "redux-saga/effects";
import { actionSetComments } from "../actions/actions";

import config from "../config";

export default function* getBookComments({id}) {

    try{
        const answer = yield call(fetch, config.SERVER + "books/" + id, {
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
        yield put(actionSetComments(book.Comments));

    } catch (error) {
        console.log(`server response error ${error}`);
    }
}

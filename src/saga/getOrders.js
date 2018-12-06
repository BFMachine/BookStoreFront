import { put, call, select } from "redux-saga/effects";
import { actionSetOrders } from "../actions/actions";

import config from "../config";

const getTokens = state => state.tokens;
const getAuthentications = state => state.authentications;

export default function* getOrders() {

    let tokens = yield select(getTokens);
    let auth = yield select(getAuthentications);

    try{
        const answer = yield call(fetch, config.SERVER + "users/orders/" + auth.id, {
            method: "get",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + tokens.accessToken
            }
        });

        if(!answer.ok) {
            throw new Error(`status: ${answer.status} ${answer.statusText}`);
        }

        const responseBody = yield answer.json();
        const userOrders = JSON.parse(responseBody);
        yield put(actionSetOrders(userOrders));

    } catch (error) {
        console.log(`server response error ${error}`);
    }
}

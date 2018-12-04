import { takeLatest } from "redux-saga/effects";
import { INITIAL_LOAD_TOKEN } from "../actions/actions";

import initialLoadToken from "./initialLoadToken"

export default function* saga() {
    yield takeLatest(INITIAL_LOAD_TOKEN, initialLoadToken);
}

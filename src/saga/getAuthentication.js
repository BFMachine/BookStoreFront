import * as jwt from "jsonwebtoken";

import { put, call } from "redux-saga/effects";
import { actionSetTokens, actionSetAuthenticationError, actionSetAuthUser } from "../actions/actions";
import config from "../config";

export default function* getAuthentication({ email, password }) {
    
    console.log(`email ${email} password ${password}`);

    try {
        const answer = yield call(fetch, config.SERVER + "api/auth", {
            method: "post",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password })
        });

        if (answer.ok) {
            const responseBody = yield answer.json();
            const tokens = JSON.parse(responseBody);

            console.log(`Server return new tokens: ${tokens.accessToken} ${tokens.refreshToken}`);

            localStorage.setItem("RefreshT", tokens.refreshToken);
            yield put(actionSetTokens(tokens));
            
            const { id, email, role } = jwt.decode(tokens.accessToken, {complete: false});
            yield put(actionSetAuthUser(true, id, email, role));

        } else if (answer.status === 404 || answer.status === 401) {
            const answerJson = yield answer.json();
            console.log(answerJson);
            yield put(actionSetAuthenticationError(answerJson));

        } else {
            console.log("server ansewr is not ok");
            yield put(actionSetAuthenticationError("Ошибка ответа сервера"));
        }

    } catch (error) {
        console.log("auth request throw ERROR");
        yield put(actionSetAuthenticationError("Ошибка ответа сервера"));
    }
}

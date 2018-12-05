import { put, call } from "redux-saga/effects";
import { actionSetTokens, actionSetAuthentication, actionSetAuthUser } from "../actions/actions";

let jwt = require("jsonwebtoken");

export default function* getAuthentification({ email, password }) {
    
    console.log(`email ${email} password ${password}`);

    try {
        const answer = yield call(fetch, "http://localhost:3000/api/auth", {
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
            
            const { email, role } = jwt.decode(tokens.accessToken, {complete: false});
            yield put(actionSetAuthUser(true, email, role));

        } else if (answer.status === 404 || answer.status === 401) {
            const answerJson = yield answer.json();
            console.log(answerJson);
            yield put(actionSetAuthentication(true, answerJson));

        } else {
            console.log("server ansewr is not ok");
            yield put(actionSetAuthentication(true, "Ошибка ответа сервера"));
        }

    } catch (error) {
        console.log("auth request throw ERROR");
        yield put(actionSetAuthentication(true, "Ошибка ответа сервера"));
    }
}
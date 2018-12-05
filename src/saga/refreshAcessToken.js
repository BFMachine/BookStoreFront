import { put, call, select } from "redux-saga/effects";
import { actionSetTokens, actionSetAuthUser, actionSetAuthentication } from "../actions/actions";

let jwt = require("jsonwebtoken");

const getTokens = state => state.tokens;

export default function* refreshAcessToken() {
    
    let tokens = yield select(getTokens);

    if (isExpTokenValid(tokens.accessToken)) {
        console.log("access token alrady valid!");
        return;
    }

    if (!isExpTokenValid(tokens.refreshToken)) {
        console.log("no valid refresh token");
        yield put(actionSetAuthUser(false));
        return;
    }

    try{
        const answer = yield call(fetch, "http://localhost:3000/api/refresh", {
            method: "get",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + tokens.refreshToken
            }
        });

        if(answer.ok) {
            const responseBody = yield answer.json();
            tokens = JSON.parse(responseBody);

            console.log(`Server return new tokens: ${tokens.accessToken} ${tokens.refreshToken}`);

            localStorage.setItem("RefreshT", tokens.refreshToken);
            yield put(actionSetTokens(tokens));

            const { email, role } = jwt.decode(tokens.accessToken, {complete: false});
            yield put(actionSetAuthUser(true, email, role));

        } else {
            console.log("server ansewr is not ok");
            yield put(actionSetAuthUser(false));
            yield put(actionSetAuthentication(true, "Ошибка ответа сервера"));
        }

    } catch (error) {
        console.log("refresh token request throw ERROR");
        yield put(actionSetAuthUser(false));
        yield put(actionSetAuthentication(true, "Ошибка ответа сервера"));
    }
 }
 
function isExpTokenValid(token) {

    if (!token)
        return false;

    try {
        let decodedToken = jwt.decode(token, {complete: true}); 
        let dateExpToken = new Date(decodedToken.payload.exp);

        if (dateExpToken < new Date())
            return false;
        return true;

    } catch (err) {
        console.error("Error in Token valid check");
        return false;
    }
}
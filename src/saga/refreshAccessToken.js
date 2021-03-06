import * as jwt from "jsonwebtoken";

import { put, call, select } from "redux-saga/effects";
import * as actions from "../actions/actions";
import config from "../config";

const getTokens = state => state.tokens;

export default function* refreshAccessToken() {
    
    let tokens = yield select(getTokens);

    if (isExpTokenValid(tokens.accessToken)) {
        console.log("access token alrady valid!");
        return;
    }

    if (!isExpTokenValid(tokens.refreshToken)) {
        console.log("no valid refresh token");
        yield put(actions.actionSetAuthUser(false));
        return;
    }

    try{
        const answer = yield call(fetch, config.SERVER + "api/refresh", {
            method: "get",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + tokens.refreshToken
            }
        });

        if(!answer.ok) {
            throw new Error("Ошибка ответа сервера");
        }

        const responseBody = yield answer.json();
        const resJson = JSON.parse(responseBody);
        const newTokens = { 
            accessToken: resJson.accessToken, 
            refreshToken: resJson.refreshToken
        };

        console.log(`Server return new tokens: ${newTokens.accessToken} ${newTokens.refreshToken}`);

        localStorage.setItem("RefreshT", newTokens.refreshToken);
        yield put(actions.actionSetTokens(newTokens));

        const { id, email, role } = jwt.decode(newTokens.accessToken, {complete: false});
        yield put(actions.actionSetAuthUser(true, id, email, role, resJson.full_name, resJson.address, resJson.phone));

        yield put(actions.actionSetCart([])); 
        yield put(actions.actionGetCart());
        
        yield put(actions.actionSetFavorite([]));
        yield put(actions.actionGetFavorite()); 


    } catch (error) {

        console.log(`refresh token request throw error ${error.message}`);
        yield put(actions.actionSetAuthUser(false));
        yield put(actions.actionSetAuthenticationError("Ошибка ответа сервера"));
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

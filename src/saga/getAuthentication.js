import * as jwt from "jsonwebtoken";

import { put, call } from "redux-saga/effects";
import { actionSetTokens, actionSetAuthenticationError, actionSetAuthUser,
    actionSetCart, actionSetFavorite, actionGetCart, actionGetFavorite } from "../actions/actions";
    
import config from "../config";

export default function* getAuthentication({ email, password }) {
    
    try {
        const answer = yield call(fetch, config.SERVER + "api/auth", {
            method: "post",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password })
        });

        if(!answer.ok) {
            if (answer.status === 404 || answer.status === 401){
                const answerJson = yield answer.json();
                throw new Error(answerJson);
            }
            throw new Error("Ошибка ответа сервера");
        }

        const responseBody = yield answer.json();
        const resJson = JSON.parse(responseBody);
        const tokens = { 
            accessToken: resJson.accessToken, 
            refreshToken: resJson.refreshToken
        };

        console.log(`Server return new tokens: ${tokens.accessToken} ${tokens.refreshToken}`);

        localStorage.setItem("RefreshT", tokens.refreshToken);
        yield put(actionSetTokens(tokens));
        
        const decToken = jwt.decode(tokens.accessToken, {complete: false});
        yield put(actionSetAuthUser(true, decToken.id, decToken.email, decToken.role, resJson.full_name, resJson.address, resJson.phone));
        
        yield put(actionSetCart([])); 
        yield put(actionGetCart());
        
        yield put(actionSetFavorite([]));
        yield put(actionGetFavorite()); 

    } catch (error) {
        
        console.log(`auth request throw error ${error.message}`);

        if( error.name !== "Error" ) {
            error.message = "Ошибка запроса сервера";
        }
        yield put(actionSetAuthenticationError(error.message));
    }
}

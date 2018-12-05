export const SET_TOKENS = "SET_TOKENS";
export const SET_AUTHENTICATION = "SET_AUTHENTICATION";
export const SET_AUTH_USER = "SET_AUTH_USER";

// for saga 
export const INITIAL_LOAD_TOKEN = "INITIAL_LOAD_TOKEN";
export const GET_AUTHENTICATION = "GET_AUTHENTICATION";
export const REFRESH_ACCESS_TOKEN = "REFRESH_ACCESS_TOKEN";

export function actionSetTokens(tokens) {
    return {
        type: SET_TOKENS,
        tokens
    }
}

export function actionInitialLoadToken() {
    return {
        type: INITIAL_LOAD_TOKEN
    }
}

export function actionGetAuthentication(email, password ) {
    return {
        type: GET_AUTHENTICATION,
        email,
        password
    }
}

export function actionSetAuthentication(responseError, message) {
    return {
        type: SET_AUTHENTICATION,
        responseError,
        message
    }
}

export function actionRefreshAccessToken() {
    return {
        type: REFRESH_ACCESS_TOKEN
    }
}

export function actionSetAuthUser(authorized, email = "", role = "") {
    return {
        type: SET_AUTH_USER,
        authorized, 
        email,
        role
    }
}


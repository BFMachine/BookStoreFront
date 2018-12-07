export const SET_TOKENS = "SET_TOKENS";
export const SET_AUTHENTICATION_ERROR = "SET_AUTHENTICATION_ERROR";
export const SET_AUTH_USER = "SET_AUTH_USER";
export const SET_ORDERS = "SET_ORDERS";

// for saga 
export const INITIAL_LOAD_TOKEN = "INITIAL_LOAD_TOKEN";
export const GET_AUTHENTICATION = "GET_AUTHENTICATION";
export const REFRESH_ACCESS_TOKEN = "REFRESH_ACCESS_TOKEN";
export const GET_ORDERS = "GET_ORDERS";
export const LOGOUT_USER = "LOGOUT_USER";


export function actionSetTokens(tokens) {
    return {
        type: SET_TOKENS,
        tokens
    };
}

export function actionInitialLoadToken() {
    return {
        type: INITIAL_LOAD_TOKEN
    };
}

export function actionGetAuthentication(email, password ) {
    return {
        type: GET_AUTHENTICATION,
        email,
        password
    };
}

export function actionSetAuthenticationError(message) {
    return {
        type: SET_AUTHENTICATION_ERROR,
        message
    };
}

export function actionRefreshAccessToken() {
    return {
        type: REFRESH_ACCESS_TOKEN
    };
}

export function actionSetAuthUser(authorized, id = null, email = "", role = "") {
    return {
        type: SET_AUTH_USER,
        authorized, 
        id,
        email,
        role
    };
}

export function actionSetOrders(payload) {
    return {
        type: SET_ORDERS,
        payload
    };
}

export function actionGetOrders() {
    return {
        type: GET_ORDERS
    };
}

export function actionLogoutUser() {
    return {
        type: LOGOUT_USER
    };
}

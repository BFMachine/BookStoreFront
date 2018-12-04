export const SET_TOKENS = "SET_TOKENS";

export const INITIAL_LOAD_TOKEN = "INITIAL_LOAD_TOKEN";


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
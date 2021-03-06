import { put, call, select } from "redux-saga/effects";
import { actionSetCart, actionSetFavorite } from "../actions/actions";

import config from "../config";

const getTokens = state => state.tokens;
const getAuthentications = state => state.authentications;

export function* getCart() {

    let tokens = yield select(getTokens);
    let auth = yield select(getAuthentications);

    // if not authorized and store in localStorage
    if(auth.authorized === false) {
        
        let localCard = localStorage.getItem("Cart");
        if(localCard) {
            yield put(actionSetCart(JSON.parse(localCard)));       
        }
        return;
    }

    try{
        const answer = yield call(fetch, config.SERVER + "orders/cart/" + auth.id, {
            method: "get",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + tokens.accessToken
            }
        });

        if(!answer.ok) {
            if (answer.status === 404 || answer.status === 401){
                yield put(actionSetCart([]));
            }
            throw new Error(`status: ${answer.status} ${answer.statusText}`);
        }

        const userOrdersDetailed = yield answer.json();
        
        // check if no any cover
        const defaultCover = {
            id: 0,
            name: "images/empty.png", 
            type: "cover"
        };

        userOrdersDetailed.forEach((item) => {
            let foundCover = false;

            item.Files.forEach((file) => {
                if(file.type === "cover") {
                    foundCover = true;
                }
            });
            
            if(!foundCover) {
                item.Files.push(defaultCover);
            }
        });

        yield put(actionSetCart(userOrdersDetailed));

    } catch (error) {
        console.log(`server response error ${error}`); 
    }
}


export function* getFavorite() {

  let tokens = yield select(getTokens);
  let auth = yield select(getAuthentications);
  
  // if not authorized and store in localStorage
  if(auth.authorized === false) {
        
    let localFavorite = localStorage.getItem("Favorite");
    if(localFavorite) {
      yield put(actionSetFavorite(JSON.parse(localFavorite)));       
    }
    return;
  }


  try{
        const answer = yield call(fetch, config.SERVER + "orders/favorite/" + auth.id, {
            method: "get",
             headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + tokens.accessToken
            }
        });

        if(!answer.ok) {
            if (answer.status === 404 || answer.status === 401){
                yield put(actionSetFavorite([]));
            }
            throw new Error(`status: ${answer.status} ${answer.statusText}`);
        }

        const userOrdersDetailed = yield answer.json();

            // check if no any cover
        const defaultCover = {
            id: 0,
            name: "images/empty.png", 
            type: "cover"
        };

        userOrdersDetailed.forEach((item) => {
            let foundCover = false;

            item.Files.forEach((item) => {
                if(item.type === "cover") {
                    foundCover = true;
                }
            });
            
            if(!foundCover) {
                item.Files.push(defaultCover);
            }
        });

        yield put(actionSetFavorite(userOrdersDetailed));

    } catch (error) {
        console.log(`server response error ${error}`);
    }
}

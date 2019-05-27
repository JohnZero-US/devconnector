/* 
Date:2019年5月27日
Time:21点46分
Auth:John Zero
*/
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

//
const initialState = {};

//
const middelware = [thunk];

//
const store = createStore(
  //
  rootReducer,
  //
  initialState,
  //
  composeWithDevTools(applyMiddleware(...middelware))
);

export default store;

/* 
Date:2019年5月27日
Time:21点46分
Auth:John Zero
*/
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

//初始状态
const initialState = {};

//形式转换中间件
const middelware = [thunk];

//创建存储
const store = createStore(
  //根的Redux提供者
  rootReducer,
  //初始状态对象
  initialState,
  //启动，安装Redux
  composeWithDevTools(applyMiddleware(...middelware))
);

export default store;

/* 
Date:2019年5月27日
Time:21点51分
Auth:John Zero
*/
import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";

export default combineReducers({
  alert,
  auth
});

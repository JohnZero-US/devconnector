/* 
Date:2019年5月27日
Time:21点51分
Auth:John Zero
*/
import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import post from "./post";

//绑定所有的Redux委托
export default combineReducers({
  alert,
  auth,
  profile,
  post
});

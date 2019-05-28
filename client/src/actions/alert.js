//
//
import uuid from "uuid";
//
import { SET_ALERT, REMOVE_ALERT } from "./types";

//设置提示
export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
  //生成uuid
  const id = uuid.v4();
  //派发
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });

  //设置定时移除提示信息
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};

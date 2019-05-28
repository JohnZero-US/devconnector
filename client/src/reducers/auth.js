//
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR
} from "../actions/types";

//初始状态
const initialState = {
  //
  token: localStorage.getItem("token"),
  //
  isAuthenticated: null,
  //
  loading: true,
  //
  user: null
};

//导出
export default function(state = initialState, action) {
  //获取行动属性
  const { type, payload } = action;
  //判断状态类型
  switch (type) {
    //用户已加载
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    //注册成功
    case REGISTER_SUCCESS:
      //本地存储token
      localStorage.setItem("token", payload.token);
      //返回多个对象
      return {
        ...state,
        //整个用户信息
        ...payload,
        //已授权
        isAuthenticated: true,
        loading: false
      };
    //注册失败
    case REGISTER_FAIL:
    //授权失败
    case AUTH_ERROR:
      //本地存储移除token
      localStorage.removeItem("token");
      //返回多个对象
      return {
        ...state,
        //没有token
        token: null,
        //未授权
        isAuthenticated: false,
        loading: false
      };
    //默认返回状态
    default:
      return state;
  }
}

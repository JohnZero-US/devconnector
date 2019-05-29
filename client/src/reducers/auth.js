//
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from "../actions/types";

//初始状态
const initialState = {
  //存储在本地的token
  token: localStorage.getItem("token"),
  //是否已授权
  isAuthenticated: null,
  //正在读取
  loading: true,
  //用户对象
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
    //登录成功
    case LOGIN_SUCCESS:
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
    //登录失败
    case LOGIN_FAIL:
    //注销
    case LOGOUT:
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

//导入
import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE
} from "./types";
import setAuthToken from "../util/setAuthToken";

//
export const loadUser = () => async dispatch => {
  //如果本地存储有token
  if (localStorage.token) {
    //调用工具类在头部设置token
    setAuthToken(localStorage.token);
  }
  //
  try {
    //
    const res = await axios.get("/api/auth");
    //
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (error) {
    //
    dispatch({
      type: AUTH_ERROR
    });
  }
};

//导出注册函数
export const register = ({ name, email, password }) => async dispatch => {
  //创建请求配置
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  //创建参数体
  const body = JSON.stringify({ name, email, password });

  //
  try {
    //请求注册
    const res = await axios.post("/api/users", body, config);
    //调用派发，注册成功，并且设置返回数据
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    //派发加载用户
    dispatch(loadUser());
  } catch (error) {
    //获取错误的响应数据的错误数组
    const errors = error.response.data.errors;
    //如果有错误
    if (errors) {
      //循环提示错误信息
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    //调用派发，注册失败
    dispatch({
      type: REGISTER_FAIL
    });
  }
};

//导出登陆函数
export const login = (email, password) => async dispatch => {
  //创建请求配置
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  //创建参数体
  const body = JSON.stringify({ email, password });

  //
  try {
    //请求注册
    const res = await axios.post("/api/auth", body, config);
    //调用派发，登录成功，并且设置返回数据
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    //派发加载用户
    dispatch(loadUser());
  } catch (error) {
    //获取错误的响应数据的错误数组
    const errors = error.response.data.errors;
    //如果有错误
    if (errors) {
      //循环提示错误信息
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    //调用派发，登录失败
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

//注销并清空用户信息
export const logout = () => dispatch => {
  //派发清理简历信息
  dispatch({ type: CLEAR_PROFILE });
  //派发注销
  dispatch({ type: LOGOUT });
};

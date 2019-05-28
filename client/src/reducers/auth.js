//
import { REGISTER_SUCCESS, REGISTER_FAIL } from "../actions/types";

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
  const { type, playload } = action;
  //判断状态类型
  switch (type) {
    //注册成功
    case REGISTER_SUCCESS:
      //存储token
      localStorage.setItem("token", playload.token);
      //返回多个对象
      return {
        ...state,
        //整个用户信息
        ...playload,
        //已授权
        isAuthenticated: true,
        loading: false
      };
    //注册失败
    case REGISTER_FAIL:
      //移除token
      localStorage.removeItem("token", playload.token);
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

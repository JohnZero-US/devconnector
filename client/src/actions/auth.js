//导入
import axios from "axios";
import { setAlert } from "./alert";
import { REGISTER_SUCCESS, REGISTER_FAIL } from "./types";

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

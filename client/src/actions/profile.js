//
import axios from "axios";
import { setAlert } from "./alert";

//
import { GET_PROFILE, PROFILE_ERROR } from "./types";

//导出获取简历函数
export const getCurrentProfile = () => async dispatch => {
  //
  try {
    //请求获取简历
    const res = await axios.get("/api/profile/me");
    //成功，派发简历数据
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (error) {
    //发生错误时，派发错误信息
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

//创建或更新简历
export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    //配置请求头
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    //发送创建或修改简历请求
    const res = await axios.post("/api/profile", formData, config);
    //成功，派发简历数据
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
    //弹出提示信息
    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));
    //
    if (!edit) {
      //如果并非编辑，成功后直接返回仪表盘
      history.push("/dashboard");
    }
  } catch (error) {
    //获取错误的响应数据的错误数组
    const errors = error.response.data.errors;
    //如果有错误
    if (errors) {
      //循环提示错误信息
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    //发生错误时，派发错误信息
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

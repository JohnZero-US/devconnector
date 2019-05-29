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

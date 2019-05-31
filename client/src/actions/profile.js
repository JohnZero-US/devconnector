//
import axios from "axios";
import { setAlert } from "./alert";

//
import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  GET_REPOS
} from "./types";

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

//获取所有简历
export const getProfiles = () => async dispatch => {
  //派发，清理简历对象
  dispatch({
    type: CLEAR_PROFILE
  });
  //
  try {
    //请求获取简历
    const res = await axios.get("/api/profile");
    //成功，派发简历数据
    dispatch({
      type: GET_PROFILES,
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

//根据用户id获取简历
export const getProfileById = userId => async dispatch => {
  try {
    //先清理简历缓存
    dispatch({
      type: CLEAR_PROFILE
    });
    //请求获取简历
    const res = await axios.get(`/api/profile/user/${userId}`);
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

//获取Github仓库
export const getGithubRepos = username => async dispatch => {
  //
  try {
    //请求获取简历
    const res = await axios.get(`/api/profile/github/${username}`);
    //成功，派发简历数据
    dispatch({
      type: GET_REPOS,
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

//添加工作经验
export const addExperience = (formData, history) => async dispatch => {
  try {
    //配置请求头
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    //发送添加工作经验请求
    const res = await axios.put("/api/profile/experience", formData, config);
    //成功，派发简历数据
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    //弹出提示信息
    dispatch(setAlert("Experience Added", "success"));
    //成功后直接返回仪表盘
    history.push("/dashboard");
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

//添加教育经历
export const addEducation = (formData, history) => async dispatch => {
  try {
    //配置请求头
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    //发送添加工作经验请求
    const res = await axios.put("/api/profile/education", formData, config);
    //成功，派发简历数据
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    //弹出提示信息
    dispatch(setAlert("Education Added", "success"));
    //成功后直接返回仪表盘
    history.push("/dashboard");
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

//删除工作经验
export const deleteExperience = id => async dispatch => {
  try {
    //发送删除工作经验请求
    const res = await axios.delete(`/api/profile/experience/${id}`);
    //成功，派发简历数据
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    //弹出提示信息
    dispatch(setAlert("Experience Removed", "success"));
  } catch (error) {
    //发生错误时，派发错误信息
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

//删除教育经历
export const deleteEducation = id => async dispatch => {
  try {
    //发送删除工作经验请求
    const res = await axios.delete(`/api/profile/education/${id}`);
    //成功，派发简历数据
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    //弹出提示信息
    dispatch(setAlert("Education Removed", "success"));
  } catch (error) {
    //发生错误时，派发错误信息
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

//删除账号和简历
export const deleteAccount = id => async dispatch => {
  //
  if (window.confirm("Are you sure?This can NOT be undone!")) {
    try {
      //发送删除简历请求
      await axios.delete(`/api/profile`);
      //成功，删除简历成功
      dispatch({
        type: CLEAR_PROFILE
      });
      //成功，删除账号成功
      dispatch({
        type: ACCOUNT_DELETED
      });
      //弹出提示信息
      dispatch(
        setAlert("Your account has been permanatly deleted!", "success")
      );
    } catch (error) {
      //发生错误时，派发错误信息
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status
        }
      });
    }
  }
};

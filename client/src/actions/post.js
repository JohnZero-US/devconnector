//

//
import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST
} from "./types";

//获取所有帖文
export const getPosts = () => async dispatch => {
  try {
    //发送请求，获取帖文集合
    const res = await axios.get("/api/posts");
    //成功，派发
    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (error) {
    //发生错误时，派发错误信息
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

//添加一个like
export const addLike = id => async dispatch => {
  try {
    //发送请求，更新贴文的like集合
    const res = await axios.put(`/api/posts/like/${id}`);
    //成功，派发
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (error) {
    //发生错误时，派发错误信息
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

//移除一个like
export const removeLike = id => async dispatch => {
  try {
    //发送请求，更新贴文的like集合
    const res = await axios.put(`/api/posts/unlike/${id}`);
    //成功，派发
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (error) {
    //发生错误时，派发错误信息
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

//删除贴文
export const deletePost = id => async dispatch => {
  try {
    //发送请求，根据id删除贴文
    await axios.delete(`/api/posts/${id}`);
    //成功，派发
    dispatch({
      type: DELETE_POST,
      payload: id
    });
    //弹出提示
    dispatch(setAlert("Post Removed", "success"));
  } catch (error) {
    //发生错误时，派发错误信息
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

//添加贴文
export const addPost = formData => async dispatch => {
  //
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  //
  try {
    //发送请求，添加贴文
    const res = await axios.post(`/api/posts`, formData, config);
    //成功，派发
    dispatch({
      type: ADD_POST,
      payload: res.data
    });
    //弹出提示
    dispatch(setAlert("Post Created", "success"));
  } catch (error) {
    //发生错误时，派发错误信息
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

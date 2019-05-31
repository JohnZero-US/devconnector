//

//
import axios from "axios";
import { setAlert } from "./alert";
import { GET_POSTS, POST_ERROR } from "./types";

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

//
import { GET_POSTS, POST_ERROR } from "../actions/types";

//初始状态
const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {}
};

//导出
export default function(state = initialState, action) {
  //获取行动属性
  const { type, payload } = action;
  //判断类型
  switch (type) {
    //获取所有贴文
    case GET_POSTS:
      //返回
      return {
        ...state,
        posts: payload,
        loading: false
      };
    //贴文错误
    case POST_ERROR:
      //返回
      return {
        ...state,
        posts: payload,
        loading: false
      };
    //默认
    default:
      return state;
  }
}

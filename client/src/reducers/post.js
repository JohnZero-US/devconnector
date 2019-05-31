//
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST
} from "../actions/types";

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
    //添加贴文
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false
      };
    //删除帖子
    case DELETE_POST:
      //
      return {
        ...state,
        //根据post集合中的id对比移除了的帖子的id，不相同即保留
        posts: state.posts.filter(post => post._id !== payload),
        loading: false
      };
    //贴文错误
    case POST_ERROR:
      //返回
      return {
        ...state,
        error: payload,
        loading: false
      };
    //更新Like集合
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map(post =>
          //遍历贴文集合，如果对应id，则对like集合进行更改
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false
      };
    //默认
    default:
      return state;
  }
}

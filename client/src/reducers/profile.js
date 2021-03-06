import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILES,
  GET_REPOS
} from "../actions/types";
//

//初始状态
const initialState = {
  //简历
  profile: null,
  //简历集合
  profiles: [],
  //仓库集合
  repos: [],
  //正在读取
  loading: true,
  //错误信息
  error: {}
};

//导出委托实现
export default function(state = initialState, action) {
  //
  const { type, payload } = action;

  //判断类型
  switch (type) {
    //获取单个简历成功
    case GET_PROFILE:
    //更新简历成功
    case UPDATE_PROFILE:
      //返回简历载体
      return { ...state, profile: payload, loading: false };
    //获取所有简历
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      };
    //获取简历错误
    case PROFILE_ERROR:
      //返回错误载体
      return { ...state, error: payload, loading: false };
    //清理简历信息
    case CLEAR_PROFILE:
      //返回清理后的空载体
      return { ...state, profile: null, repos: [], loading: false };
    //获取github仓库
    case GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false
      };
    //默认
    default:
      //返回状态
      return state;
  }
}

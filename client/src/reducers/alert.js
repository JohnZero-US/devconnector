//引用枚举
import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

//初始状态
const initialState = [];

//导出提示信息
export default function(state = initialState, action) {
  //
  const { type, payload } = action;

  //判断提示类型
  switch (type) {
    //设置提示
    case SET_ALERT:
      //返回状态数组和行动信息
      return [...state, payload];
    //移除提示
    case REMOVE_ALERT:
      //
      return state.filter(alert => alert.id !== payload);
    //默认
    default:
      //返回当前状态
      return state;
  }
}

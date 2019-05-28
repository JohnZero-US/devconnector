//
import axios from "axios";

//
const setAuthToken = token => {
  //判断
  if (token) {
    //如果存在token，在头部添加一个token参数
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    //移除token参数
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

//导出
export default setAuthToken;

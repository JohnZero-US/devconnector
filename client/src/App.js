/* 
Date:2019年5月27日
Time:15点18分
Auth:John Zero
*/
import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
//注册html组件
//导航栏
import Navbar from "./components/layout/Navbar";
//主页面
import Landing from "./components/layout/Landing";
//主路由
import Routes from "./components/routing/Routes";

//Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./util/setAuthToken";

//样式
import "./App.css";

//如果本地存储有token
if (localStorage.token) {
  //调用工具类在头部设置token
  setAuthToken(localStorage.token);
}

//每次刷新都会加载
const App = () => {
  //
  useEffect(() => {
    //派发调用加载用户
    store.dispatch(loadUser());
  }, []);

  //视图
  return (
    /* 加载store，加载redux */
    <Provider store={store}>
      {/* 路由 */}
      <Router>
        <Fragment>
          {/* 导航栏 */}
          <Navbar />
          {/* 首页导航 */}
          <Route exact path="/" component={Landing} />
          {/*主路由*/}
          <Route component={Routes} />
        </Fragment>
      </Router>
    </Provider>
  );
};

//
export default App;

/* 
Date:2019年5月27日
Time:15点18分
Auth:John Zero
*/
import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//私有路由
import PrivateRoute from "./components/routing/PrivateRoute";
//注册html组件
//导航栏
import Navbar from "./components/layout/Navbar";
//主页
import Landing from "./components/layout/Landing";
//注册
import Register from "./components/auth/Register";
//登录
import Login from "./components/auth/Login";
//提示
import Alert from "./components/layout/Alert";
//仪表盘
import Dashboard from "./components/dashboard/Dashboard";
//创建简历
import CreateProfile from "./components/profile-forms/CreateProfile";
//修改简历
import EditProfile from "./components/profile-forms/EditProfile";

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

const App = () => {
  //
  useEffect(() => {
    //派发调用加载用户
    store.dispatch(loadUser());
  }, []);

  //
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
          {/* 主页面 */}
          <section className="container">
            {/* 提示框 */}
            <Alert />
            <Switch>
              {/* 注册 */}
              <Route exact path="/register" component={Register} />
              {/* 登录 */}
              <Route exact path="/login" component={Login} />
              {/* 仪表盘 */}
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              {/* 创建简历 */}
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
              {/* 修改简历 */}
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

//
export default App;

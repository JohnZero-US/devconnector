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
//主页面
import Landing from "./components/layout/Landing";
//注册页面
import Register from "./components/auth/Register";
//登录页面
import Login from "./components/auth/Login";
//提示框
import Alert from "./components/layout/Alert";
//仪表盘页面
import Dashboard from "./components/dashboard/Dashboard";
//创建简历页面
import CreateProfile from "./components/profile-forms/CreateProfile";
//修改简历页面
import EditProfile from "./components/profile-forms/EditProfile";
//添加工作经验页面
import AddExerience from "./components/profile-forms/AddExerience";
//添加教育经历页面
import AddEducation from "./components/profile-forms/AddEducation";
//简历列表页面
import Profiles from "./components/profiles/Profiles";
//简历详细资料页面
import Profile from "./components/profile/Profile";
//贴文列表页面
import Posts from "./components/posts/Posts";
//贴文详情页面
import Post from "./components/post/Post";

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
              {/* 简历列表 */}
              <Route exact path="/profiles" component={Profiles} />
              {/* 简历详情 */}
              <Route exact path="/profile/:id" component={Profile} />
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
              {/* 添加工作经验 */}
              <PrivateRoute
                exact
                path="/add-experience"
                component={AddExerience}
              />
              {/* 添加教育经历 */}
              <PrivateRoute
                exact
                path="/add-education"
                component={AddEducation}
              />
              {/* 贴文列表 */}
              <PrivateRoute exact path="/posts" component={Posts} />
              {/* 贴文详情 */}
              <PrivateRoute exact path="/post/:id" component={Post} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

//
export default App;

//

//
import React from "react";
import { Route, Switch } from "react-router-dom";
//私有路由
import PrivateRoute from "./PrivateRoute";
//注册html组件
//提示框
import Alert from "../layout/Alert";
//404页面
import NotFound from "../layout/NotFound";
//注册页面
import Register from "../auth/Register";
//登录页面
import Login from "../auth/Login";
//仪表盘页面
import Dashboard from "../dashboard/Dashboard";
//创建简历页面
import CreateProfile from "../profile-forms/CreateProfile";
//修改简历页面
import EditProfile from "../profile-forms/EditProfile";
//添加工作经验页面
import AddExerience from "../profile-forms/AddExerience";
//添加教育经历页面
import AddEducation from "../profile-forms/AddEducation";
//简历列表页面
import Profiles from "../profiles/Profiles";
//简历详细资料页面
import Profile from "../profile/Profile";
//贴文列表页面
import Posts from "../posts/Posts";
//贴文详情页面
import Post from "../post/Post";

//自定义路由
const Routes = props => {
  return (
    //页面主体
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
        <PrivateRoute exact path="/create-profile" component={CreateProfile} />
        {/* 修改简历 */}
        <PrivateRoute exact path="/edit-profile" component={EditProfile} />
        {/* 添加工作经验 */}
        <PrivateRoute exact path="/add-experience" component={AddExerience} />
        {/* 添加教育经历 */}
        <PrivateRoute exact path="/add-education" component={AddEducation} />
        {/* 贴文列表 */}
        <PrivateRoute exact path="/posts" component={Posts} />
        {/* 贴文详情 */}
        <PrivateRoute exact path="/post/:id" component={Post} />
        {/* 404页面 */}
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;

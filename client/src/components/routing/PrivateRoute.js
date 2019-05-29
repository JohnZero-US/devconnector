//
import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//rafcp
//所有私有化的链接的路由
const PrivateRoute = ({
  //原来的组件对象
  component: Component,
  //注入的授权信息
  auth: { isAuthenticated, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      !isAuthenticated && !loading ? (
        //未通过授权
        <Redirect to="/login" />
      ) : (
        //已通过授权
        <Component {...props} />
      )
    }
  />
);

//指定要依赖注入的对象
PrivateRoute.prototype = {
  auth: PropTypes.object.isRequired
};

//设置映射对象
const mapStateToProps = state => ({
  auth: state.auth
});

//导出默认对象，并且连接（依赖注入）
export default connect(mapStateToProps)(PrivateRoute);

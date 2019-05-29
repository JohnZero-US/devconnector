/* 
Date:2019年5月27日
Time:15点17分
Auth:John Zero
*/
import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//导出
const Landing = ({ isAuthenticated }) => {
  //
  if (isAuthenticated) {
    //如果已经登录，跳转到仪表盘页面
    return <Redirect to="/dashboard" />;
  }

  //
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Developer Connector</h1>
          <p className="lead">
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div className="buttons">
            <Link to="register" className="btn btn-primary">
              Sign Up
            </Link>
            <Link to="login" className="btn btn-light">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

//指定要依赖注入的对象
Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

//设置映射对象
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

//导出默认对象，并且连接（依赖注入）
export default connect(mapStateToProps)(Landing);

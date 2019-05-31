/* 
Date:2019年5月27日
Time:15点18分
Auth:John Zero
*/
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

//导航栏页面
const Navbar = ({ logout, auth: { isAuthenticated, loading } }) => {
  //已登录
  const authLinks = (
    <ul>
      {/* 简历列表 */}
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      {/* 贴文列表 */}
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      {/* 仪表盘 */}
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user" />{" "}
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      {/* 登出 */}
      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt" />{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  //未登录
  const guestLinks = (
    <ul>
      {/* 简历列表 */}
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      {/* 注册 */}
      <li>
        <Link to="register">Register</Link>
      </li>
      {/* 登录 */}
      <li>
        <Link to="login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code" /> DevConnector
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

//指定要依赖注入的对象
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

//设置映射对象
const mapStateToProps = state => ({
  auth: state.auth
});

//导出默认对象，并且连接（依赖注入）
export default connect(
  mapStateToProps,
  { logout }
)(Navbar);

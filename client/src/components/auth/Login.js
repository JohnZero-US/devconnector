/* 
Date:2019年5月27日
Time:15点33分
Auth:John Zero
*/
import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

//导出登录页面函数
const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  /* 输入框的值改变的事件绑定 */
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  /* 提交事件 */
  const onSubmit = async e => {
    e.preventDefault();
    //执行登录
    login(email, password);
  };

  //如果已授权
  if (isAuthenticated) {
    //重定向到登录后的页面
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user" /> Sign into Your Account
      </p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="register">Sign Up</Link>
      </p>
    </Fragment>
  );
};

//指定要依赖注入的对象
Login.propTypes = {
  //ptfr
  login: PropTypes.func.isRequired,
  //是否已授权
  isAuthenticated: PropTypes.bool
};

//设置映射对象
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

//导出默认对象，并且连接（依赖注入）
export default connect(
  mapStateToProps,
  { login }
)(Login);

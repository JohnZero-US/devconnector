/* 
Date:2019年5月27日
Time:15点33分
Auth:John Zero
*/
import React, { Fragment, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  const { name, email, password, password2 } = formData;

  /* 输入框的值改变的事件绑定 */
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  /* 提交事件 */
  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      //如果两次密码不相同
      console.log("Passwords do not match");
    } else {
      //请求配置
      const config = {
        header: {
          "Content-Type": "application/json"
        }
      };
      //新建一个用户对象
      const newUser = {
        name,
        email,
        password
      };
      //
      try {
        //发送post请求，并接收响应对象
        const res = await axios.post("/api/users", newUser, config);
        //打印响应数据
        console.log(res.data);
      } catch (error) {
        //打印错误信息
        console.error(error.response.data);
      }
    }
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user" /> Create Your Account
      </p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={e => onChange(e)}
            required
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={password2}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="login">Sign In</Link>
      </p>
    </Fragment>
  );
};

export default Register;

//

//
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addExperience } from "../../actions/profile";

//添加工作经验的页面
const AddExerience = ({ addExperience, history }) => {
  //表单对象
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: ""
  });
  //是否显示结束日期
  const [toDateDisabled, toggleDisabled] = useState(false);
  //重新结构化表单
  const { company, title, location, from, to, current, description } = formData;
  //更改值事件
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  //
  return (
    <Fragment>
      <h1 className="large text-primary">Add An Experience</h1>
      <p className="lead">
        <i className="fas fa-code-branch" /> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form
        className="form"
        onSubmit={e => {
          //执行默认事件
          e.preventDefault();
          //添加工作经验
          addExperience(formData, history);
        }}
      >
        <div className="form-group">
          {/* 标题 */}
          <input
            type="text"
            placeholder="* Job Title"
            name="title"
            value={title}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          {/* 公司 */}
          <input
            type="text"
            placeholder="* Company"
            name="company"
            value={company}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          {/* 位置 */}
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          {/* 开始日期 */}
          <input
            type="date"
            name="from"
            value={from}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <p>
            {/* 是否在工 */}
            <input
              type="checkbox"
              name="current"
              checked={current}
              value={current}
              onChange={e => {
                setFormData({ ...formData, current: !current });
                toggleDisabled(!toDateDisabled);
              }}
            />{" "}
            Current Job
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          {/* 结束日期 */}
          <input
            type="date"
            name="to"
            value={to}
            onChange={e => onChange(e)}
            disabled={toDateDisabled ? "disabled" : ""}
          />
        </div>
        <div className="form-group">
          {/* 描述 */}
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={description}
            onChange={e => onChange(e)}
          />
        </div>
        <input type="submit" value="Submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

//指定要依赖注入的对象
AddExerience.propTypes = {
  addExperience: PropTypes.func.isRequired
};

//设置映射属性
/* const mapStateToProps = state => ({
  profile: state.profile
}); */

//导出默认对象，并且连接（依赖注入）
export default connect(
  null,
  { addExperience }
)(AddExerience);

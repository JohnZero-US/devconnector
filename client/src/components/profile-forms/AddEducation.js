//

//
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addEducation } from "../../actions/profile";

//添加教育经历的页面
const AddEducation = ({ addEducation, history }) => {
  //表单对象
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: ""
  });
  //是否显示结束日期
  const [toDateDisabled, toggleDisabled] = useState(false);
  //重新结构化表单
  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  } = formData;
  //更改值事件
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  //
  return (
    <Fragment>
      <h1 className="large text-primary">Add Your Education</h1>
      <p className="lead">
        <i className="fas fa-graduation-cap" /> Add any school, bootcamp, etc
        that you have attended
      </p>
      <small>* = required field</small>
      <form
        className="form"
        onSubmit={e => {
          //默认事件
          e.preventDefault();
          //添加教育经历
          addEducation(formData, history);
        }}
      >
        <div className="form-group">
          {/* 学校名称 */}
          <input
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            value={school}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          {/* 学历 */}
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            value={degree}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          {/* 专业 */}
          <input
            type="text"
            placeholder="Field Of Study"
            name="fieldofstudy"
            value={fieldofstudy}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          {/* 开始时间 */}
          <input
            type="date"
            name="from"
            value={from}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <p>
            {/* 是否在读 */}
            <input
              type="checkbox"
              name="current"
              value=""
              checked={current}
              value={current}
              onChange={e => {
                setFormData({ ...formData, current: !current });
                toggleDisabled(!toDateDisabled);
              }}
            />{" "}
            Current School or Bootcamp
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
            placeholder="Program Description"
            value={description}
            onChange={e => onChange(e)}
          />
        </div>
        <input type="submit" value="Submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="dashboard.html">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

//指定要依赖注入的对象
AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired
};

//设置映射属性
/* const mapStateToProps = state => ({
  profile: state.profile
}); */

//导出默认对象，并且连接（依赖注入）
export default connect(
  null,
  { addEducation }
)(AddEducation);

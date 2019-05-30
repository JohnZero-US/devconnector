//

//
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";

//工作经验列表页面
const Experience = ({ experience }) => {
  //表格视图
  const experiences = experience.map(exp => (
    <tr key={exp.id}>
      {/* 公司 */}
      <td>{exp.company}</td>
      {/* 标题 */}
      <td className="hide-sm">{exp.title}</td>
      <td>
        {/* 开始工作日期 */}
        <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
        {exp.to === null ? (
          /*如果结束日期为空，即到当前 */
          " Current"
        ) : (
          /* 否则，显示结束日期 */
          <Moment format="YYYY/MM/DD">{exp.to}</Moment>
        )}
      </td>
      <td>
        {/* 删除按钮 */}
        <button className="btn btn-danger">Delete</button>
      </td>
    </tr>
  ));

  //
  return (
    <Fragment>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th className="hide-sm">Operation</th>
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
};

/* 赋值默认属性 */
Experience.propTypes = {
  experience: PropTypes.array.isRequired
};

export default connect()(Experience);

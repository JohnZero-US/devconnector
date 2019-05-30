//

//
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteEducation } from "../../actions/profile";

//教育经历列表页面
const Education = ({ education, deleteEducation }) => {
  //表格视图
  const educations = education.map(edu => (
    <tr key={edu.id}>
      {/* 学校 */}
      <td>{edu.school}</td>
      {/* 学历 */}
      <td className="hide-sm">{edu.degree}</td>
      <td>
        {/* 开始学习日期 */}
        <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{" "}
        {edu.to === null ? (
          /*如果结束日期为空，即到当前 */
          " Current"
        ) : (
          /* 否则，显示结束日期 */
          <Moment format="YYYY/MM/DD">{edu.to}</Moment>
        )}
      </td>
      <td>
        {/* 删除按钮 */}
        <button
          onClick={() => deleteEducation(edu.id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  //
  return (
    <Fragment>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th className="hide-sm">Operation</th>
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};

/* 赋值默认属性 */
Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteEducation }
)(Education);

//

//
import React from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

//简历列表项页面
const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    locaion,
    skills
  }
}) => {
  return (
    <div className="profile bg-light">
      {/* 头像 */}
      <img className="round-img" src={avatar} alt="img"/>
      <div>
        {/* 姓名 */}
        <h2>{name}</h2>
        {/* 如果有公司则显示公司 */}
        <p>
          {status} {company && <span> at {company}</span>}
        </p>
        {/* 如果有位置则显示位置 */}
        <p className="my-1">{locaion && <span>{locaion}</span>}</p>
        {/* 链接：显示简历详情 */}
        <Link to={`/profile/${_id}`} className="btn btn-primary">
          View Profile
        </Link>
      </div>
      <ul>
        {/* 遍历技能列表 */}
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index} className="text-primary">
            <i className="fas fa-check" /> {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

//属性类型
ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;

//

//
import React, { Fragment } from "react";
import PropTypes from "prop-types";

//简历关于
const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name }
  }
}) => {
  return (
    <div className="profile-about bg-light p-2">
      {/* 如果个人介绍存在 */}
      {bio && (
        <Fragment>
          <h2 className="text-primary">{name}'s Bio</h2>
          <p>{bio}</p>
          <div className="line" />
        </Fragment>
      )}
      <h2 className="text-primary">Skill Set</h2>
      <div className="skills">
        {/* 遍历技能 */}
        {skills.map((skill, index) => (
          <div className="p-1" key={index}>
            <i className="fa fa-check" /> {skill}
          </div>
        ))}
      </div>
    </div>
  );
};

//属性类型
ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

//
export default ProfileAbout;

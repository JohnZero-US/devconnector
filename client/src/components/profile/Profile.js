//

//
import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";
import { getProfileById } from "../../actions/profile";

//简历详情页面
const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match
}) => {
  //使用特效
  useEffect(() => {
    //根据id获取简历
    getProfileById(match.params.id);
  }, [getProfileById]);
  //
  return (
    <Fragment>
      {loading || profile === null || profile.user._id !== match.params.id ? (
        /* 加载中 */
        <Spinner />
      ) : (
        <Fragment>
          {/* 后退按钮 */}
          <Link to="/profiles" className="btn btn-light">
            Back to profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              /* 如果为当前登录用户，则允许编辑 */
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          {/*   */}
          <div className="profile-grid my-1">
            {/* 顶部 */}
            <ProfileTop profile={profile} />
            {/* 关于 */}
            <ProfileAbout profile={profile} />
            {/*  */}
            {/* 工作经验 */}
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {profile.experience.length > 0 ? (
                /* 如果工作经验集合大于0，遍历集合 */
                <Fragment>
                  {profile.experience.map(experience => (
                    <ProfileExperience
                      key={experience._id}
                      experience={experience}
                    />
                  ))}
                </Fragment>
              ) : (
                /* 否则，弹出提示 */
                <h4>No experience credential</h4>
              )}
            </div>
            {/*  */}
            {/* 教育经历 */}
            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {profile.education.length > 0 ? (
                /* 如果学习经历集合大于0，遍历集合 */
                <Fragment>
                  {profile.education.map(education => (
                    <ProfileEducation
                      key={education._id}
                      education={education}
                    />
                  ))}
                </Fragment>
              ) : (
                /* 否则，弹出提示 */
                <h4>No education credential</h4>
              )}
            </div>
            {/*  */}
            {/* Github仓库 */}
            {profile.githubusername && (
              <ProfileGithub username={profile.githubusername} />
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

//属性类型
Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

//映射状态数据到属性
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

//依赖注入（连接）
export default connect(
  mapStateToProps,
  { getProfileById }
)(Profile);

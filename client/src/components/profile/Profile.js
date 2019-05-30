//

//
import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
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
  }, [getProfileById, match.params.id]);
  //
  return (
    <Fragment>
      {profile === null || loading ? (
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

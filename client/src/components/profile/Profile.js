//

//
import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
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
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back to profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
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

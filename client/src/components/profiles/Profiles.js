//

//
import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import ProfileItem from "./ProfileItem";
import { getProfiles } from "../../actions/profile";

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  //只执行一次
  useEffect(() => {
    //获取简历列表
    getProfiles();
  }, []);
  //
  return (
    <Fragment>
      {/* 是否加载中 */}
      {loading ? (
        /* 如果加载中就显示加载的gif */
        <Spinner />
      ) : (
        /* 加载完毕 */
        <Fragment>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop" /> Browse and connect with
            developers
          </p>
          <div className="profiles">
            {/* 简历列表是否大于0 */}
            {profiles.length > 0 ? (
              /* 如果是，则调用简历页面对象，显示简历 */
              profiles.map(profile => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              /* 如果简历数量小于0 */
              <h4>No profiles found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

//设置属性类型
Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

//映射状态信息到属性
const mapStateToProps = state => ({
  profile: state.profile
});

//依赖注入
export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);

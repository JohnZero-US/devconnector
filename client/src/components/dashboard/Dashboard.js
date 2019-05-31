//
import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading }
}) => {
  //默认启动
  useEffect(() => {
    //执行获取当前简历
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        /* 如果简历不为空 */
        <Fragment>
          {/* 仪表盘按钮 */}
          <DashboardActions />
          {/* 工作经验列表 */}
          <Experience experience={profile.experience} />
          {/* 教育经历列表 */}
          <Education education={profile.education} />
          {/* 删除账号 */}
          <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fas fa-user-minus" /> Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        /* 如果简历为空，提示创建简历 */
        <Fragment>
          <p>You have not yet setup a profile,please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

//指定要依赖注入的对象
Dashboard.propTypes = {
  //获取当前简历
  getCurrentProfile: PropTypes.func.isRequired,
  //授权信息
  auth: PropTypes.object.isRequired,
  //简历对象
  profile: PropTypes.object.isRequired,
  //删除账号
  deleteAccount: PropTypes.func.isRequired
};

//设置映射对象
const mapStateToProps = state => ({
  //授权信息
  auth: state.auth,
  //简历
  profile: state.profile
});

//导出默认对象，并且连接（依赖注入）
export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);

//

//

//
import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getGithubRepos } from "../../actions/profile";

const ProfileGithub = ({ username, getGithubRepos, repos }) => {
  //使用效果
  useEffect(() => {
    //根据github的用户名获取github仓库信息
    getGithubRepos(username);
  }, [getGithubRepos,username]);
  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">
        <i className="fab fa-github" /> Github Repos
      </h2>
      {repos === null ? (
        <Spinner />
      ) : (
        /* 如果Github仓库信息集合大于0，遍历集合 */
        <Fragment>
          {repos.map(repo => (
            <div className="repo bg-white p-1 my-1">
              <div>
                <h4>
                  {/* Github地址链接 */}
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {/* 仓库全称 */}
                    {repo.full_name}
                  </a>
                </h4>
                {/* 描述 */}
                <p>{repo.description}</p>
              </div>
              <div>
                <ul>
                  {/* 收藏数 */}
                  <li className="badge badge-primary">
                    Stars: {repo.stargazers_count}
                  </li>
                  {/* 关注数 */}
                  <li className="badge badge-dark">
                    Watchers: {repo.watchers_count}
                  </li>
                  {/* 分支贡献数 */}
                  <li className="badge badge-light">
                    Forks: {repo.forks_count}
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </Fragment>
      )}
    </div>
  );
};

//属性类型
ProfileGithub.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  repos: PropTypes.array.isRequired
};

//从状态映射到属性
const mapStateToProps = state => ({
  repos: state.profile.repos
});

//依赖注入
export default connect(
  mapStateToProps,
  {
    getGithubRepos
  }
)(ProfileGithub);

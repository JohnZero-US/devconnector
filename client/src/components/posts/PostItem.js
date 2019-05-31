//

//
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";

//贴文详细页面
const PostItem = ({
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date }
}) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        {/* 简历 */}
        <Link to={`/profile/${user}`}>
          {/* 头像 */}
          <img className="round-img" src={avatar} alt="" />
          {/* 用户名 */}
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        {/* 贴文内容 */}
        <p className="my-1">{text}</p>
        {/* 最后更新时间 */}
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD HH:mm:ss">{date}</Moment>
        </p>
        {/* like数 */}
        <button type="button" className="btn btn-light">
          <i className="fas fa-thumbs-up" />{" "}
          {likes.length > 0 && <span>{likes.length}</span>}
        </button>
        {/* unlike */}
        <button type="button" className="btn btn-light">
          <i className="fas fa-thumbs-down" />
        </button>
        {/* 评论数 */}
        <Link to={`/post/${_id}`} className="btn btn-primary">
          Discussion{" "}
          {comments.length > 0 && (
            <span className="comment-count">{comments.length}</span>
          )}
        </Link>
        {/* 删除 */}
        {!auth.loading && user === auth.user._id && (
          //如果贴文为本人，提供删除按钮
          <button type="button" className="btn btn-danger">
            <i className="fas fa-times" />
          </button>
        )}
      </div>
    </div>
  );
};

//属性类型
PostItem.propTypes = {
  post: PropTypes.object.isRequired
};

//映射状态到属性
const mapStateToProps = state => ({
  auth: state.auth
});

//依赖注入
export default connect(
  mapStateToProps,
  {}
)(PostItem);
//

//
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { deleteComment } from "../../actions/post";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const CommentItem = ({
  deleteComment,
  comment,
  auth: { isAuthenticated, user },
  postId
}) => {
  return (
    <Fragment>
      <div className="post bg-white p-1 my-1">
        <div>
          {/* 简历链接 */}
          <Link to={`/profile/${comment.user}`}>
            <img className="round-img" src={comment.avatar} alt="" />
            <h4>{comment.name}</h4>
          </Link>
        </div>
        <div>
          {/* 贴文 */}
          <p className="my-1">{comment.text}</p>
          {/* 日期 */}
          <p className="post-date">
            Posted on{" "}
            <Moment format="YYYY/MM/DD HH:mm:SS">{comment.date}</Moment>
          </p>
          {/* 删除按钮 */}
          {isAuthenticated && user._id === comment.user && (
            /* 如果评论为当前用户，则显示删除评论按钮 */
            <button
              onClick={e => {
                deleteComment(postId, comment._id);
              }}
              type="button"
              className="btn btn-danger"
            >
              <i className="fas fa-times" />
            </button>
          )}
        </div>
      </div>
    </Fragment>
  );
};

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    deleteComment
  }
)(CommentItem);

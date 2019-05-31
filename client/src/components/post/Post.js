//

//
import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getPost } from "../../actions/post";
import { Link } from "react-router-dom";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

const Post = ({ getPost, post: { post, loading }, match }) => {
  //使用效果
  useEffect(() => {
    //根据id获取贴文
    getPost(match.params.id);
  }, [getPost, match.params.id]);
  //返回
  return loading || post === null || post._id !== match.params.id ? (
    <Spinner />
  ) : (
    <Fragment>
      {/* 返回贴文列表 */}
      <Link to="/posts" className="btn">
        Back To Posts
      </Link>
      {/* 贴文 */}
      <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${post.user}`}>
            <img className="round-img" src={post.avatar} alt="" />
            <h4>{post.name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">{post.text}</p>
        </div>
      </div>

      {/* 评论输入框 */}
      <CommentForm postId={post._id} />

      {/* 评论列表 */}
      <div className="comments">
        {/* 遍历评论列表 */}
        {post.comments.map(comment => (
          <CommentItem postId={post._id} comment={comment} />
        ))}
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  {
    getPost
  }
)(Post);

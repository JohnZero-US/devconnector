//

//
import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getPosts } from "../../actions/post";
import PostItem from "./PostItem";

//贴文列表页面
const Posts = ({ getPosts, post: { posts, loading } }) => {
  //使用效果
  useEffect(() => {
    //获取贴文
    getPosts();
  }, [getPosts]);
  //返回视图
  return loading || posts === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome to the community!
      </p>
      {/* 贴文输入框 */}
      <div className="post-form">
        <div className="bg-primary p">
          <h3>Say Something...</h3>
        </div>
        <form className="form my-1">
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a post"
            required
          />
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>

      {/* 贴文列表 */}
      <div className="posts">
        {posts.map(post => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
};

//属性类型
Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};
//映射状态到属性
const mapStateToProps = state => ({
  post: state.post
});

//依赖注入
export default connect(
  mapStateToProps,
  {
    getPosts
  }
)(Posts);

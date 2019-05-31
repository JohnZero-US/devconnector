//

//
import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/post";

//评论输入框
const CommentForm = ({ addComment, postId }) => {
  //
  const [text, setText] = useState("");
  //
  return (
    <Fragment>
      <div className="post-form">
        <div className="bg-primary p">
          <h3>Leave A Comment</h3>
        </div>
        <form
          className="form my-1"
          onSubmit={e => {
            //执行默认事件
            e.preventDefault();
            //添加评论
            addComment(postId, { text });
            //重置输入框
            setText("");
          }}
        >
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Comment on this post"
            value={text}
            onChange={e => {
              setText(e.target.value);
            }}
            required
          />
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    </Fragment>
  );
};

CommentForm.propTypes = {
  postId: PropTypes.string.isRequired,
  addComment: PropTypes.func.isRequired
};

export default connect(
  null,
  { addComment }
)(CommentForm);

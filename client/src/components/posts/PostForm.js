//

//
import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";

const PostForm = ({ addPost }) => {
  //
  const [text, setText] = useState("");
  //

  //
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={e => {
          //执行默认事件
          e.preventDefault();
          //添加贴文
          addPost({ text });
          //重置输入框
          setText("");
        }}
      >
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a post"
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
        <input
          type="submit"
          className="btn btn-dark my-1"
          value="Submit"
        />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(
  null,
  { addPost }
)(PostForm);

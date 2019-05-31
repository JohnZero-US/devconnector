//

//
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const CommentForm = ({ postId }) => {
  return <div />;
};

CommentForm.propTypes = {
  postId: PropTypes.string.isRequired
};

export default connect(
  null,
  {}
)(CommentForm);

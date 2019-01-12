import React, { Component } from "react";
import propTypes from "prop-types";
import CommentItem from "./CommentItem";

class CommentFeed extends Component {
  render() {
    const { comments, projectId } = this.props;

    return comments.map(comment => (
      <CommentItem key={comment._id} comment={comment} projectId={projectId} />
    ));
  }
}

CommentFeed.propTypes = {
  comments: propTypes.array.isRequired,
  projectId: propTypes.string.isRequired
};

export default CommentFeed;

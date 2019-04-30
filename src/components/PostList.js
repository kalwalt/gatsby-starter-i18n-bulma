import React from 'react';
import PropTypes from 'prop-types';
import PostListItem from './PostListItem';

const PostList = ({props}) => {
  return (
    <nav>
      <ul>
        {props.posts.map(post =>
          <PostListItem post={post} />
        )}
      </ul>
    </nav>
  );
};

PostList.propTypes = {
  posts: PropTypes.array
};

export default PostList;

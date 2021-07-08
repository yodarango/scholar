import React from 'react';
import Comment from '../posts/comment';
import postsWrapperStyle from '../styles/layouts/PostsWrapper.module.css';

export default function PostsWrapper() {
   return (
      <div className={`main-wrapper ${postsWrapperStyle.postsWrapper}`}>
         <Comment />
      </div>
   );
}

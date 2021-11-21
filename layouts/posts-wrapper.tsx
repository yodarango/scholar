// core
import React, { useEffect, useState } from "react";

// components
import Comment from "../posts/comment";

// styles
import postsWrapperStyle from "../styles/layouts/PostsWrapper.module.css";

// helper
import { Tcommentary } from "../posts/comment";

type postWrapperProps = {
   commentaries: Tcommentary[];
};

export default function PostsWrapper({ commentaries }: postWrapperProps) {
   return (
      <div className={`main-wrapper ${postsWrapperStyle.postsWrapper}`}>
         {commentaries &&
            commentaries.map((commentary: Tcommentary) => (
               <Comment key={commentary.ID} commentary={commentary} reportOption={true} />
            ))}
      </div>
   );
}

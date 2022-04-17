// core
import { useState, useEffect } from "react";
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
            commentaries.length !== 0 &&
            commentaries.map((commentary: Tcommentary) => {
               return (
                  <section
                     key={commentary.ID}
                     className={`${postsWrapperStyle.postsWrapperCommentary}`}>
                     <Comment commentary={commentary} />
                  </section>
               );
            })}
         {commentaries.length === 0 && (
            <h2 className={`${postsWrapperStyle.noCommentsTitle} std-text-block_small-title`}>
               be the first one to comment on this verse!
            </h2>
         )}
      </div>
   );
}

// core
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

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
   const router = useRouter();
   const [pageState, setpageState] = useState<number>(0);
   const handleLoadMoreCommentaries = (frwd: boolean) => {
      frwd === true ? setpageState(pageState + 1) : setpageState(pageState - 1);
      router.query.last_id
         ? (router.query.last_id = commentaries[commentaries.length - 1].ID)
         : router.push({
              pathname: router.pathname,
              query: {
                 verse: router.query.verse ? router.query.verse : "",
                 last_id: commentaries[commentaries.length - 1].ID
              }
           });
   };
   return (
      <div className={`main-wrapper ${postsWrapperStyle.postsWrapper}`}>
         {/* dont show backwards button if no comments exist */}
         {pageState !== 0 && (
            <button
               className={`${postsWrapperStyle.loadLessButton}`}
               onClick={() => handleLoadMoreCommentaries(false)}></button>
         )}
         {/* only show an empty placeholder button if no comments exist */}
         {pageState === 0 && <div></div>}
         {commentaries &&
            commentaries.length !== 0 &&
            commentaries.map((commentary: Tcommentary) => (
               <section
                  key={commentary.ID}
                  className={`${postsWrapperStyle.postsWrapperCommentary}`}>
                  <Comment commentary={commentary} reportOption={true} />
               </section>
            ))}
         {commentaries.length === 0 && (
            <h2 className={`std-text-block_small-title ${postsWrapperStyle.noCommentsTitle}`}>
               Be the first one to comment on this verse!
            </h2>
         )}
         {commentaries.length !== 0 && (
            <button
               className={`${postsWrapperStyle.loadMoreButton}`}
               onClick={() => handleLoadMoreCommentaries(true)}></button>
         )}
      </div>
   );
}

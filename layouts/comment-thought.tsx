// core
import React, { useState } from "react";

//components
import Comment from "../posts/comment";
import Thought from "../posts/thought";

//styles
import commentThoughtStyles from "../styles/layouts/CommentThought.module.css";

// helpers
import { Tcommentary } from "../posts/comment";

type commentThoughtProps = {
   commentaries: Tcommentary[];
};
const CommentThought = ({ commentaries }: commentThoughtProps) => {
   // ===========================    FUNCTION 1: filter hte posts either by commentaries or by Thought  ======== //
   const [filterThoughtCommentState, setFilterThoughtCommentState] = useState<{
      comment: boolean;
      thought: boolean;
      commentaryBkg: string;
      thoughtBkg: string;
   }>({ comment: true, thought: false, commentaryBkg: "", thoughtBkg: "#5c5470" });

   const handleFilterComment = () => {
      setFilterThoughtCommentState({
         comment: true,
         thought: false,
         commentaryBkg: "",
         thoughtBkg: "#5c5470"
      });
   };

   const handleFilterCThought = () => {
      setFilterThoughtCommentState({
         comment: false,
         thought: true,
         commentaryBkg: "#5c5470",
         thoughtBkg: ""
      });
   };

   return (
      <div className={commentThoughtStyles.mainWrapper}>
         <div className={commentThoughtStyles.buttonWrapper}>
            <span
               className={`${commentThoughtStyles.commentariesButton} std-button`}
               onClick={handleFilterComment}
               style={{ backgroundColor: filterThoughtCommentState.commentaryBkg }}>
               <p className='std-button_gradient-text'>Commentaries</p>
            </span>
            <span
               className={`${commentThoughtStyles.thoughtButton} std-button`}
               onClick={handleFilterCThought}
               style={{ backgroundColor: filterThoughtCommentState.thoughtBkg }}>
               <p className='std-button_gradient-text'>Thoughts</p>
            </span>
         </div>
         <div className={`large-spacer`}></div>
         {filterThoughtCommentState.comment && <Comment commentaries={commentaries} />}
         {filterThoughtCommentState.thought && <Thought />}
      </div>
   );
};

export default CommentThought;

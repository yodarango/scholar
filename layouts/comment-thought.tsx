// core
import React, { useEffect, useState } from "react";

//components
import Comment from "../posts/comment";
import Thought from "../posts/thought";

//styles
import commentThoughtStyles from "../styles/layouts/CommentThought.module.css";

// helpers
import { Tcommentary } from "../posts/comment";
import { Tthought } from "../posts/thought";

const CommentThought = () => {
   // ====================   FUNCTION 1:  fetch the commentary data   ==========   //
   const [commentaries, setCommentaries] = useState<Tcommentary[]>([]);
   const fetchCommentary = async () => {
      const commReq = await fetch("https://scholar-be.herokuapp.com/commentaries");
      const commentaries = await commReq.json();
      setCommentaries(commentaries);
   };
   // ====================   FUNCTION 2:  fetch the commentary data   ==========   //
   const [thoughts, setThought] = useState<Tthought[]>([]);
   const fetchThought = async () => {
      const thoughtReq = await fetch("https://scholar-be.herokuapp.com/thoughts");
      const thoughts = await thoughtReq.json();
      setThought(thoughts);
   };

   useEffect(() => {
      fetchCommentary();
      fetchThought();
   }, []);

   // ===========================    FUNCTION 3: filter hte posts either by commentaries or by Thought  ======== //
   const [filterThoughtCommentState, setFilterThoughtCommentState] = useState<{
      comment: boolean;
      thought: boolean;
      commentaryBkg: string;
      thoughtBkg: string;
   }>({ comment: true, thought: false, commentaryBkg: "", thoughtBkg: "#5c5470" });

   // ===========================    FUNCTION 4: Pull only the commentary content   ======== //
   const handleFilterComment = () => {
      setFilterThoughtCommentState({
         comment: true,
         thought: false,
         commentaryBkg: "",
         thoughtBkg: "#5c5470"
      });
   };

   // ===========================    FUNCTION 5: Pull only the thought content   ======== //
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
         {filterThoughtCommentState.comment && (
            <Comment commentaries={commentaries} reportOption={true} />
         )}
         {filterThoughtCommentState.thought && <Thought thoughts={thoughts} reportOption={true} />}
      </div>
   );
};

export default CommentThought;

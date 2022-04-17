// core
import React, { useState } from "react";

// graphql
import client from "../apollo-client";
import { WIGO_REQUEST_MORE_COMMENTARIES } from "../graphql/posts/commentaries";
import { WIGO_REQUEST_MORE_THOUGHTS } from "../graphql/posts/thoughts";

//components
import Comment from "../posts/comment";
import Thought from "../posts/thought";

//styles
import commentThoughtStyles from "../styles/layouts/CommentThought.module.css";

// helpers
import { Tcommentary } from "../posts/comment";
import { Tthought } from "../posts/thought";

type commentThoughtProps = {
   commentaries: Tcommentary[];
   thoughts: Tthought[];
};

const CommentThought = ({ commentaries, thoughts }: commentThoughtProps) => {
   // ===========================    FUNCTION 1: set the initial state for each content  ======== //
   const [responseCommentaryState, setResponseCommentaryState] = useState<number>(
      commentaries.length
   );
   const [responseThoughtState, setresponseThoughtState] = useState<number>(thoughts.length);
   const [commentariesState, setCommentariesState] = useState<Tcommentary[]>(commentaries);

   const requestMoreComments = async (last_id: string) => {
      const { data } = await client.query({
         query: WIGO_REQUEST_MORE_COMMENTARIES,
         variables: { last_id: last_id }
      });

      setResponseCommentaryState(data.commentary.length);
      setCommentariesState((commentariesState) => [...commentariesState, ...data.commentary]);
   };

   // ===========================    FUNCTION 2: set the initial state for each content  ======== //
   const [thoughtsState, setThoughtsState] = useState<Tthought[]>(thoughts);

   const requestMoreThoughts = async (last_id: string) => {
      const { data } = await client.query({
         query: WIGO_REQUEST_MORE_THOUGHTS,
         variables: { last_id: last_id }
      });
      setresponseThoughtState(data.thought.length);
      setThoughtsState((thoughtsState) => [...thoughtsState, ...data.thought]);
   };

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
         {filterThoughtCommentState.comment &&
            commentariesState.map((commentary: Tcommentary) => (
               <Comment commentary={commentary} key={commentary.ID} />
            ))}
         {commentariesState && responseCommentaryState === 20 && filterThoughtCommentState.comment && (
            <button
               className={`std-button`}
               onClick={() =>
                  requestMoreComments(commentariesState[commentariesState.length - 1].ID)
               }>
               <p className={`std-button_gradient-text`}>Load More</p>
            </button>
         )}
         {filterThoughtCommentState.comment && commentariesState.length === 0 && (
            <h2 className={commentThoughtStyles.noContrastTitle}>what have you nearned today 🕮</h2>
         )}
         {filterThoughtCommentState.thought && <Thought thoughts={thoughtsState} />}
         {filterThoughtCommentState.thought && thoughtsState.length === 0 && (
            <h2 className={commentThoughtStyles.noContrastTitle}>what's on your 🧠?</h2>
         )}
         {thoughtsState && responseThoughtState === 20 && filterThoughtCommentState.thought && (
            <button
               className={`std-button`}
               onClick={() => requestMoreThoughts(thoughtsState[thoughtsState.length - 1].ID)}>
               <p className={`std-button_gradient-text`}>Load More</p>
            </button>
         )}
      </div>
   );
};

export default CommentThought;

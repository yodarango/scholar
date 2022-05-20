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
   commentaries: Tcommentary[] | null;
   thoughts: Tthought[] | null;
};

const CommentThought = ({ commentaries, thoughts }: commentThoughtProps) => {
   // ===========================    FUNCTION 1: set the initial state for each content  ======== //
   const [responseCommentaryState, setResponseCommentaryState] = useState<number>(
      commentaries ? commentaries.length : 0
   );
   const [responseThoughtState, setresponseThoughtState] = useState<number>(
      thoughts ? thoughts.length : 0
   );
   const [commentariesState, setCommentariesState] = useState<Tcommentary[] | null>(commentaries);

   const requestMoreComments = async (last_id: string) => {
      try {
         const { data } = await client.query({
            query: WIGO_REQUEST_MORE_COMMENTARIES,
            variables: { last_id: last_id }
         });

         setResponseCommentaryState(data.commentary.length);
         setCommentariesState((commentariesState) =>
            commentariesState ? [...commentariesState, ...data.commentary] : []
         );
      } catch (error) {
         console.log(error);
      }
   };

   // ===========================    FUNCTION 2: set the initial state for each content  ======== //
   const [thoughtsState, setThoughtsState] = useState<Tthought[] | null>(thoughts);

   const requestMoreThoughts = async (last_id: string) => {
      const { data } = await client.query({
         query: WIGO_REQUEST_MORE_THOUGHTS,
         variables: { last_id: last_id }
      });
      setresponseThoughtState(data.thought.length);
      setThoughtsState((thoughtsState) =>
         thoughtsState ? [...thoughtsState, ...data.thought] : []
      );
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
      <div className={`${commentThoughtStyles.mainWrapper}`}>
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
         <div className={`large-spacer`}></div>
         <section className={commentThoughtStyles.wholeThouchtCommentWrapper}>
            {commentariesState &&
               filterThoughtCommentState.comment &&
               commentariesState.map((commentary: Tcommentary) => (
                  <section key={commentary.ID}>
                     <Comment commentary={commentary} />
                  </section>
               ))}
            {commentariesState &&
               responseCommentaryState === 20 &&
               filterThoughtCommentState.comment && (
                  <button
                     className={`std-button`}
                     onClick={() =>
                        requestMoreComments(commentariesState[commentariesState.length - 1].ID)
                     }>
                     <p className={`std-button_gradient-text`}>Load More</p>
                  </button>
               )}
            {commentariesState &&
               filterThoughtCommentState.comment &&
               commentariesState.length === 0 && (
                  <h2 className={commentThoughtStyles.noContrastTitle}>
                     what have you nearned today? 💡
                  </h2>
               )}
            {thoughtsState && filterThoughtCommentState.thought && (
               <Thought thoughts={thoughtsState} />
            )}
            {thoughtsState && filterThoughtCommentState.thought && thoughtsState.length === 0 && (
               <h2 className={commentThoughtStyles.noContrastTitle}>what's on your 🧠?</h2>
            )}
            {thoughtsState && responseThoughtState === 20 && filterThoughtCommentState.thought && (
               <button
                  className={`std-button`}
                  onClick={() => requestMoreThoughts(thoughtsState[thoughtsState.length - 1].ID)}>
                  <p className={`std-button_gradient-text`}>Load More</p>
               </button>
            )}
         </section>
      </div>
   );
};

export default CommentThought;

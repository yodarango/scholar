// core
import React, { useState, useEffect } from "react";

//graphQL
import client from "../../../apollo-client";
import { GET_PROFILE_COMMENTARIES } from "../../../graphql/users/profile";

// components
import Comments from "../../../posts/comment";

// styles
import homePageContentStyles from "../../../styles/layouts/home-page-content/HomePageContent.module.css";

// helpers / types
import { Tcommentary } from "../../../posts/comment";
import { Tuser } from "../../../pages/users/[...userId]";

type commentariesContent = {
   user: Tuser;
   handleCloseCommentaries: any;
};

const CommentariesContent = ({ handleCloseCommentaries, user }: commentariesContent) => {
   const [commentaryState, setCommentaryState] = useState<Tcommentary[]>([]);
   const [commentaryLastIdState, setCommentaryLastIdState] = useState<string>("99999999999");
   const [hideLoadMoreBttnState, setHideLoadMoreBttnState] = useState<boolean>(false);

   useEffect(() => {
      const fetchMoreComments = async () => {
         const { data } = await client.query({
            query: GET_PROFILE_COMMENTARIES,
            variables: { ID: user.ID, totalCountOnly: false, last_id: commentaryLastIdState }
         });

         setCommentaryState((commentaryState) => [
            ...commentaryState,
            ...data.users[0].all_posts.commentaries
         ]);
         data.users[0].all_posts.commentaries.length < 20 ? setHideLoadMoreBttnState(true) : null;
      };
      fetchMoreComments();
   }, [commentaryLastIdState]);

   return (
      <div className={"dark-bkg"}>
         <span className={"closeModal"} onClick={handleCloseCommentaries}>
            X
         </span>
         <section className={homePageContentStyles.popUpContentWrapper}>
            <h1 className={homePageContentStyles.popUpContentWrapper_title}>
               Commentaries by {user.signature}
            </h1>
            {commentaryState.map((commentary: Tcommentary) => (
               <section>
                  <Comments
                     key={commentary.ID}
                     commentary={{
                        ...commentary,
                        creator: {
                           ID: user.ID,
                           avatar: user.avatar,
                           signature: user.signature,
                           authority_level: user.authority_level,
                           approval_rating: user.approval_rating
                        }
                     }}
                     deleteOption={true}
                     editOption={true}
                     reportOption={true}
                  />
               </section>
            ))}
         </section>
         {!hideLoadMoreBttnState && (
            <button
               className={"std-button"}
               onClick={() =>
                  setCommentaryLastIdState(commentaryState[commentaryState.length - 1].ID)
               }>
               <p className='std-button_gradient-text'>Load More</p>
            </button>
         )}
      </div>
   );
};

export default CommentariesContent;

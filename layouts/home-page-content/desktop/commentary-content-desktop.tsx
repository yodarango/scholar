// core
import { useState, useEffect } from "react";

// graphQL
import client from "../../../apollo-client";
import { GET_PROFILE_COMMENTARIES } from "../../../graphql/users/profile";

// comps
import Comment from "../../../posts/comment";

// styles
import homePageContentDesktopStyles from "../../../styles/layouts/home-page-content/HomePageContentDesktop.module.css";

// helpers
import { Tcommentary } from "../../../posts/comment";
import { Tuser } from "../../../pages/users/[userId]";

type commentaryContentDesktopProps = {
   user: Tuser | null | undefined;
};

const CommentaryContentDesktop = ({ user }: commentaryContentDesktopProps) => {
   // ================  FUNCTION 1: request the commentaries by user   ================= //
   const [commentaryState, setCommentaryState] = useState<Tcommentary[]>([]);
   const [commentaryLastIdState, setCommentaryLastIdState] = useState<string>("99999999999");
   const [hideLoadMoreBttnState, setHideLoadMoreBttnState] = useState<boolean>(false);

   useEffect(() => {
      const fetchMoreComments = async () => {
         const { data } = await client.query({
            query: GET_PROFILE_COMMENTARIES,
            variables: { ID: user?.ID, totalCountOnly: false, last_id: commentaryLastIdState }
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
      <div className={homePageContentDesktopStyles.contentWrapper}>
         {commentaryState.map((commentary: Tcommentary) => (
            <>
               {user && (
                  <section>
                     <Comment
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
                     />
                  </section>
               )}
            </>
         ))}
         {!hideLoadMoreBttnState && (
            <button
               className={`${homePageContentDesktopStyles.stdButton} std-button`}
               onClick={() =>
                  setCommentaryLastIdState(commentaryState[commentaryState.length - 1].ID)
               }>
               <p className={"std-button_gradient-text"}>Load More</p>
            </button>
         )}
      </div>
   );
};

export default CommentaryContentDesktop;

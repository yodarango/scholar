// core
import { useState, useEffect } from "react";
import Link from "next/link";

//graphQL
import client from "../../../apollo-client";
import { GET_PROFILE_COMMENTARIES } from "../../../graphql/users/profile";

// components
import Comments from "../../../posts/comment";
import SmallLoader from "../../../fragments/chunks/small_loader";
import ResourceNotFoundError from "../../resource-not-found-error";
import CommentariesProfileMenu from "../../../fragments/buttons/commentaries-profile-menu";

// styles
import homePageContentStyles from "../../../styles/layouts/home-page-content/HomePageContent.module.css";
import cardsLazyLoadingStyles from "../../../styles/layouts/CardsLazyLoading.module.css";

// helpers / types
import { Tcommentary } from "../../../posts/comment";
import { Tuser } from "../../../pages/users/[userId]";
import CardsLazyLoading from "../../cards-lazy-loading";

type commentariesContent = {
   user: Tuser | null;
};

const CommentariesContent = ({ user }: commentariesContent) => {
   const [loadingState, setLoadingState] = useState<string>("loading");
   const [smallLoadingState, setSmallLoadingState] = useState<boolean>(false);
   const [commentaryState, setCommentaryState] = useState<Tcommentary[]>([]);
   const [commentaryLastIdState, setCommentaryLastIdState] = useState<string>("99999999999");
   const [hideLoadMoreBttnState, setHideLoadMoreBttnState] = useState<boolean>(false);

   // fetch the initial content
   const fetchMoreComments = async () => {
      setSmallLoadingState(true);
      try {
         const { data } = await client.query({
            query: GET_PROFILE_COMMENTARIES,
            variables: { ID: user?.ID, totalCountOnly: false, last_id: commentaryLastIdState }
         });

         if (data.users[0].all_posts.commentaries) {
            setCommentaryState((commentaryState) => [
               ...commentaryState,
               ...data.users[0].all_posts.commentaries
            ]);
            data.users[0].all_posts.commentaries.length < 20
               ? setHideLoadMoreBttnState(true)
               : null;
            setLoadingState("done");
            setSmallLoadingState(false);
         }
      } catch (error) {
         setLoadingState("error");
         console.log(error);
         setSmallLoadingState(false);
      }
   };

   useEffect(() => {
      fetchMoreComments();
   }, [commentaryLastIdState]);

   return (
      <div className={"dark-bkg"}>
         <Link href={`/users/${user?.ID}`}>
            <a className={"closeModal"}>X</a>
         </Link>
         <section className={homePageContentStyles.popUpContentWrapper}>
            {user && user.signature && (
               <h1 className={homePageContentStyles.popUpContentWrapper_title}>
                  Commentaries by {user.signature}
               </h1>
            )}
            <CommentariesProfileMenu />
            {user &&
               commentaryState &&
               loadingState === "done" &&
               commentaryState.map((commentary: Tcommentary) => (
                  <section key={commentary.ID}>
                     <Comments
                        commentary={{
                           ...commentary,
                           creator: {
                              ID: user.ID,
                              avatar: user.avatar,
                              signature: user.signature,
                              authority_level: user.authority_level,
                              approval_rating: user.approval_rating,
                              my_church: user.my_church,
                              first_name: user.first_name,
                              last_name: user.last_name
                           }
                        }}
                     />
                  </section>
               ))}
            {commentaryState?.length === 0 && loadingState === "done" && (
               <h2 className={homePageContentStyles.noNotifications}>
                  No commentaries have been made yet
               </h2>
            )}
            {loadingState === "loading" && (
               <CardsLazyLoading amount={25} compClass={cardsLazyLoadingStyles.postCardCTSN} />
            )}
            {loadingState == "error" && <ResourceNotFoundError />}
         </section>

         {!hideLoadMoreBttnState && !smallLoadingState && (
            <button
               className={"std-button"}
               onClick={() =>
                  setCommentaryLastIdState(commentaryState[commentaryState.length - 1].ID)
               }>
               <p className='std-button_gradient-text'>Load More</p>
            </button>
         )}
         {smallLoadingState && !hideLoadMoreBttnState && <SmallLoader />}
      </div>
   );
};

export default CommentariesContent;

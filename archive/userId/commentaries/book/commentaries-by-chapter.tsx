// core
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

//graphQL
import client from "../../../../../apollo-client";
import { GET_COMMENTARIES_BY_BOOK } from "../../../../../graphql/posts/commentaries";

// components
import Comments from "../../../../components/fragments/cards/posts/commentary";
import SmallLoader from "../../../../components/fragments/chunks/small_loader";
import ResourceNotFoundError from "../../../../components/fragments/chunks/error_resource_not_found";
import CommentariesProfileMenu from "../../../../../fragments/buttons/commentaries-profile-menu";

// styles
import homePageContentStyles from "../../../../../styles/layouts/home-page-content/HomePageContent.module.css";
//import commentariesByBookStyles from "../../../../../styles/templates/users/userId/commentaries-by-book/CommentariesByChapter.module.css";
import cardsLazyLoadingStyles from "../../../../../styles/layouts/CardsLazyLoading.module.css";

// helpers / types
import { Tcommentary } from "../../../../components/fragments/cards/posts/commentary";
import { Tuser } from "../../../../../pages/users/[userId]";
import CardsLazyLoading from "../../../../../layouts/cards-lazy-loading";

export const CommentariesByChapter = () => {
   // router
   const router = useRouter();
   const user_id = router.query.userId;
   const chapter_id = router.query.chapter;

   const [loadingState, setLoadingState] = useState<string>("loading");
   const [smallLoadingState, setSmallLoadingState] = useState<boolean>(false);
   const [commentaryState, setCommentaryState] = useState<Tcommentary[] | null>([]);
   const [user, setUser] = useState<Tuser | null>(null);
   const [commentaryLastIdState, setCommentaryLastIdState] = useState<string>("99999999999");
   const [hideLoadMoreBttnState, setHideLoadMoreBttnState] = useState<boolean>(false);

   // fetch the initial content
   const fetchComments = async () => {
      setSmallLoadingState(true);
      try {
         const { data } = await client.query({
            query: GET_COMMENTARIES_BY_BOOK,
            variables: {
               USER_ID: user_id,
               last_id: commentaryLastIdState,
               VERSE_ID: chapter_id,
               ID: user_id
            }
         });

         if (data.commentary && data.users) {
            setCommentaryState((commentaryState) =>
               commentaryState ? [...commentaryState, ...data.commentary] : null
            );
            data.commentary.length < 20 ? setHideLoadMoreBttnState(true) : null;
            setUser(data.users[0]);
            setLoadingState("done");
            setSmallLoadingState(false);
         }
      } catch (error) {
         setLoadingState("error");
         console.log(error);
         setSmallLoadingState(false);
         setCommentaryState(null);
         setUser(null);
      }
   };

   useEffect(() => {
      if (router.isReady) {
         fetchComments();
      }
   }, [commentaryLastIdState, router.isReady]);

   return (
      <div className={"dark-bkg"}>
         <Link href={`/users/${user?.ID}/commentaries/by-book/`}>
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

         {commentaryState && !hideLoadMoreBttnState && !smallLoadingState && (
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

// core
import { useState, useEffect } from "react";
import Image from "next/image";

//graphQL
import client from "../../../apollo-client";
import { GET_PROFILE_SERMON_NOTES } from "../../../graphql/users/profile";

// comps
import SermonNotesPost from "../../../fragments/cards/posts/sermon_note";
import ResourceNotFoundError from "../../../fragments/chunks/error_resource_not_found";

//styles
import homePageContentStyles from "../../../styles/layouts/home-page-content/HomePageContent.module.css";
import cardsLazyLoadingStyles from "../../../styles/layouts/CardsLazyLoading.module.css";

// helpers / state
import { TsermonPost } from "../../../fragments/cards/posts/sermon_note";
import { Tuser } from "../../../pages/users/[userId]";
import CardsLazyLoading from "../../cards-lazy-loading";
import SmallLoader from "../../../fragments/chunks/small_loader";

type sermonNotesContentProps = {
   user: Tuser;
   handleCloseSermonNotes: any;
};

const SermonNotesContent = ({ user, handleCloseSermonNotes }: sermonNotesContentProps) => {
   const [loadingState, setLoadingState] = useState<string>("loading");
   const [smallLoadingState, setSmallLoadingState] = useState<boolean>(false);
   const [sermonState, setsermonState] = useState<TsermonPost[]>([]);
   const [sermonNotesLastIdState, setSermonNotesLastIdState] = useState<string>("99999999999");
   const [hideLoadMoreBttnState, setHideLoadMoreBttnState] = useState<boolean>(false);

   const requestSermons = async () => {
      setSmallLoadingState(true);
      try {
         const { data } = await client.query({
            query: GET_PROFILE_SERMON_NOTES,
            variables: { ID: user.ID, totalCountOnly: false, last_id: sermonNotesLastIdState }
         });

         setsermonState((sermonState) => [...sermonState, ...data.users[0].all_posts.sermon_notes]);
         data.users[0].all_posts.sermon_notes.length < 20 ? setHideLoadMoreBttnState(true) : null;
         setSmallLoadingState(false);
         setLoadingState("done");
      } catch (error) {
         console.log(error);
         setSmallLoadingState(false);
         setLoadingState("error");
      }
   };

   useEffect(() => {
      requestSermons();
   }, [sermonNotesLastIdState]);

   return (
      <div className={"dark-bkg"}>
         <span className={"closeModal"} onClick={handleCloseSermonNotes}>
            X
         </span>
         <section className={homePageContentStyles.popUpContentWrapper}>
            {user.signature && (
               <h1 className={homePageContentStyles.popUpContentWrapper_title}>
                  Sermons by {user.signature}
               </h1>
            )}
            {sermonState &&
               loadingState === "done" &&
               sermonState.map((sermon: TsermonPost) => (
                  <section>
                     <SermonNotesPost
                        key={sermon.ID}
                        sermonPost={{
                           ...sermon,
                           creator: {
                              ID: user.ID,
                              avatar: user.avatar,
                              signature: user.signature,
                              authority_level: user.authority_level,
                              approval_rating: user.approval_rating,
                              first_name: user.first_name,
                              last_name: user.last_name,
                              my_church: user.my_church
                           }
                        }}
                     />
                  </section>
               ))}

            {sermonState?.length === 0 && loadingState === "done" && (
               <h2 className={homePageContentStyles.noNotifications}>
                  No sermons have been uploaded yet
               </h2>
            )}
            {loadingState === "loading" && (
               <CardsLazyLoading amount={25} compClass={cardsLazyLoadingStyles.postCardCTSN} />
            )}
            {loadingState == "error" && <ResourceNotFoundError />}

            {!hideLoadMoreBttnState && !smallLoadingState && (
               <button
                  className={"std-button"}
                  onClick={() => setSermonNotesLastIdState(sermonState[sermonState.length - 1].ID)}>
                  <p className='std-button_gradient-text'>Load More</p>
               </button>
            )}
            {smallLoadingState && !hideLoadMoreBttnState && <SmallLoader />}
         </section>
      </div>
   );
};

export default SermonNotesContent;

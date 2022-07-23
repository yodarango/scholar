// core
import { useState, useEffect } from "react";
import Image from "next/image";

// graphQL
import client from "../../../apollo-client";
import { GET_PROFILE_SERMON_NOTES } from "../../../graphql/users/profile";

// styles
import homePageContentDesktopStyles from "../../../styles/layouts/home-page-content/HomePageContentDesktop.module.css";
import cardsLazyLoadingStyles from "../../../styles/layouts/CardsLazyLoading.module.css";

// comps
import SermonNotesPost from "../../../posts/sermon-notes-post";
import SmallLoader from "../../../fragments/chunks/small_loader";
import CardsLazyLoading from "../../cards-lazy-loading";
import ResourceNotFoundError from "../../resource-not-found-error";

// helpers
import { TsermonPost } from "../../../posts/sermon-notes-post";
import { Tuser } from "../../../pages/users/[userId]";

type commentaryContentDesktopProps = {
   user: Tuser;
};

const SermonNotesContentDesktop = ({ user }: commentaryContentDesktopProps) => {
   // ================  FUNCTION 1: request the commentaries by user   ================= //

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
      <div className={homePageContentDesktopStyles.contentWrapper}>
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
            <h2 className={homePageContentDesktopStyles.noNotifications}>
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
      </div>
   );
};

export default SermonNotesContentDesktop;

// core
import React, { useState, useEffect } from "react";

//graphQL
import client from "../../../apollo-client";
import { GET_PROFILE_SERMON_NOTES } from "../../../graphql/users/profile";

// comps
import SermonNotesPost from "../../../posts/sermon-notes-post";

//styles
import homePageContentStyles from "../../../styles/layouts/home-page-content/HomePageContent.module.css";

// helpers / state
import { TsermonPost } from "../../../posts/sermon-notes-post";
import { Tuser } from "../../../pages/users/[userId]";

type sermonNotesContentProps = {
   user: Tuser;
   handleCloseSermonNotes: any;
};

const SermonNotesContent = ({ user, handleCloseSermonNotes }: sermonNotesContentProps) => {
   const [sermonState, setsermonState] = useState<TsermonPost[]>([]);
   const [sermonNotesLastIdState, setSermonNotesLastIdState] = useState<string>("99999999999");
   const [hideLoadMoreBttnState, setHideLoadMoreBttnState] = useState<boolean>(false);

   useEffect(() => {
      const requestSermons = async () => {
         const { data } = await client.query({
            query: GET_PROFILE_SERMON_NOTES,
            variables: { ID: user.ID, totalCountOnly: false, last_id: sermonNotesLastIdState }
         });

         setsermonState((sermonState) => [...sermonState, ...data.users[0].all_posts.sermon_notes]);
         data.users[0].all_posts.sermon_notes.length < 20 ? setHideLoadMoreBttnState(true) : null;
      };
      requestSermons();
   }, [sermonNotesLastIdState]);

   return (
      <div className={"dark-bkg"}>
         <span className={"closeModal"} onClick={handleCloseSermonNotes}>
            X
         </span>
         <section className={homePageContentStyles.popUpContentWrapper}>
            <h1 className={homePageContentStyles.popUpContentWrapper_title}>
               Sermons by {user.signature}
            </h1>
            {sermonState.map((sermon: TsermonPost) => (
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
                           approval_rating: user.approval_rating
                        }
                     }}
                  />
               </section>
            ))}
            {!hideLoadMoreBttnState && (
               <button
                  className={"std-button"}
                  onClick={() => setSermonNotesLastIdState(sermonState[sermonState.length - 1].ID)}>
                  <p className='std-button_gradient-text'>Load More</p>
               </button>
            )}
         </section>
      </div>
   );
};

export default SermonNotesContent;

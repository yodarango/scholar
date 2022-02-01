// core
import { useState, useEffect } from "react";

// graphQL
import client from "../../../apollo-client";
import { GET_PROFILE_SERMON_NOTES } from "../../../graphql/users/profile";

// styles
import homePageContentDesktopStyles from "../../../styles/layouts/home-page-content/HomePageContentDesktop.module.css";

// comps
import SermonNotesPost from "../../../posts/sermon-notes-post";

// helpers
import { TsermonPost } from "../../../posts/sermon-notes-post";
import { Tuser } from "../../../pages/users/[userId]";

type commentaryContentDesktopProps = {
   user: Tuser;
};

const SermonNotesContentDesktop = ({ user }: commentaryContentDesktopProps) => {
   // ================  FUNCTION 1: request the commentaries by user   ================= //
   const [sermonNotesState, setSermonNoteState] = useState<TsermonPost[]>([]);
   const [sermonNotesLastIdState, setSermonNotesLastIdState] = useState<string>("99999999999");
   const [hideLoadMoreBttnState, setHideLoadMoreBttnState] = useState<boolean>(false);

   useEffect(() => {
      const fetchMoreComments = async () => {
         const { data } = await client.query({
            query: GET_PROFILE_SERMON_NOTES,
            variables: { ID: user.ID, totalCountOnly: false, last_id: sermonNotesLastIdState }
         });

         setSermonNoteState((sermonNotesState) => [
            ...sermonNotesState,
            ...data.users[0].all_posts.sermon_notes
         ]);
         console.log(data.users[0].all_posts.sermon_notes);
         data.users[0].all_posts.sermon_notes.length < 20 ? setHideLoadMoreBttnState(true) : null;
      };
      fetchMoreComments();
   }, [sermonNotesLastIdState]);

   return (
      <div className={homePageContentDesktopStyles.contentWrapper}>
         {sermonNotesState.map((sermon: TsermonPost) => (
            <SermonNotesPost
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
               deleteOption={true}
               editOption={true}
               reportOption={true}
            />
         ))}
         {!hideLoadMoreBttnState && (
            <button
               className={`${homePageContentDesktopStyles.stdButton} std-button`}
               onClick={() =>
                  setSermonNotesLastIdState(sermonNotesState[sermonNotesState.length - 1].ID)
               }>
               <p className={"std-button_gradient-text"}>Load More</p>
            </button>
         )}
      </div>
   );
};

export default SermonNotesContentDesktop;

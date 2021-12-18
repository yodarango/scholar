// core
import { useState } from "react";

// graphQL
import client from "../apollo-client";
import { WIGO_REQUEST_MORE_SERMON_NOTES } from "../graphql/posts/sermon_notes";

// components
import SermonNotesPost from "./sermon-notes-post";
//import ConfirmationPopup from "../fragments/confirmation-popup";

// styles
import librarySermonPostCarrouselStyles from "../styles/posts/SermonPostCarrousel.module.css";
//import sermonNotesPostStyles from "../styles/posts/SermonNotesPost.module.css";

// types
import { TsermonPost } from "./sermon-notes-post";

type librarySermonCarrouselProps = {
   sermonPost: TsermonPost[];
   deleteOption?: boolean;
   editOption?: boolean;
   reportOption?: boolean;
};
const LibrarySermonPostCarrousel = ({
   sermonPost,
   editOption,
   deleteOption,
   reportOption
}: librarySermonCarrouselProps) => {
   // request more sermon notes
   const [sermonPostState, setSermonPostState] = useState<TsermonPost[]>(sermonPost);
   const requestMoreSermonNotes = async (last_id: string) => {
      console.log(last_id);
      const { data } = await client.query({
         query: WIGO_REQUEST_MORE_SERMON_NOTES,
         variables: { last_id: last_id }
      });
      console.log(data.sermon_notes);
      setSermonPostState((sermonPostState) => [...sermonPostState, ...data.sermon_notes]);
   };

   return (
      <div className={`${librarySermonPostCarrouselStyles.mainWrapper}`}>
         <div className={librarySermonPostCarrouselStyles.scrollSection}>
            {sermonPostState.map((sermon: TsermonPost) => (
               <div className={librarySermonPostCarrouselStyles.sermonCompWrapper} key={sermon.ID}>
                  <SermonNotesPost
                     key={sermon.ID}
                     sermonPost={sermon}
                     deleteOption={true}
                     reportOption={true}
                     editOption={true}
                  />
               </div>
            ))}
            <button
               className={`std-button ${librarySermonPostCarrouselStyles.stdButton}`}
               onClick={() =>
                  requestMoreSermonNotes(sermonPostState[sermonPostState.length - 1].ID)
               }>
               <p className={`std-button_gradient-text`}>Load More</p>
            </button>
         </div>
      </div>
   );
};

export default LibrarySermonPostCarrousel;

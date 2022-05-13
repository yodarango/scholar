// core
import { useState } from "react";
import Image from "next/image";

// graphQL
import client from "../apollo-client";
import { WIGO_REQUEST_MORE_SERMON_NOTES } from "../graphql/posts/sermon_notes";

// components
import SermonNotesPost from "./sermon-notes-post";
//import ConfirmationPopup from "../fragments/confirmation-popup";

// styles
import librarySermonPostCarrouselStyles from "../styles/posts/SermonPostCarrousel.module.css";
import cardsLazyLoadingStyles from "../styles/layouts/CardsLazyLoading.module.css";

// types
import { TsermonPost } from "./sermon-notes-post";

type librarySermonCarrouselProps = {
   sermonPost: TsermonPost[] | null;
};
const LibrarySermonPostCarrousel = ({ sermonPost }: librarySermonCarrouselProps) => {
   // ============== FUNCTION 1: request more sermon notes
   const [sermonPostState, setSermonPostState] = useState<TsermonPost[] | null>(sermonPost);
   const requestMoreSermonNotes = async (last_id: string) => {
      try {
         const { data } = await client.query({
            query: WIGO_REQUEST_MORE_SERMON_NOTES,
            variables: { last_id: last_id }
         });
         setSermonPostState((sermonPostState) =>
            sermonPostState ? [...sermonPostState, ...data.sermon_notes] : []
         );
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <>
         {sermonPostState && (
            <div className={`${librarySermonPostCarrouselStyles.mainWrapper}`}>
               <div className={librarySermonPostCarrouselStyles.scrollSection}>
                  {sermonPostState.map((sermon: TsermonPost) => (
                     <div
                        className={librarySermonPostCarrouselStyles.sermonCompWrapper}
                        key={sermon.ID}>
                        <SermonNotesPost key={sermon.ID} sermonPost={sermon} />
                     </div>
                  ))}
                  {sermonPostState.length > 0 && (
                     <button
                        className={`std-button ${librarySermonPostCarrouselStyles.stdButton}`}
                        onClick={() =>
                           requestMoreSermonNotes(sermonPostState[sermonPostState.length - 1].ID)
                        }>
                        <p className={`std-button_gradient-text`}>Load More</p>
                     </button>
                  )}
                  {sermonPostState.length === 0 && (
                     <h2 className={librarySermonPostCarrouselStyles.noContrastTitle}>
                        upload your sermons
                     </h2>
                  )}
               </div>
            </div>
         )}
         {!sermonPostState && (
            <div className={cardsLazyLoadingStyles.errorImage}>
               <Image layout='fill' alt='resource not found' src={"/Parks10.png"} />
            </div>
         )}
      </>
   );
};

export default LibrarySermonPostCarrousel;

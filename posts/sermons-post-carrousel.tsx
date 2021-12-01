// core
import React from "react";

// components
import SermonNotesPost from "./sermon-notes-post";
import ConfirmationPopup from "../fragments/confirmation-popup";

// styles
import librarySermonPostCarrouselStyles from "../styles/posts/SermonPostCarrousel.module.css";
import sermonNotesPostStyles from "../styles/posts/SermonNotesPost.module.css";

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
   return (
      <div className={`${librarySermonPostCarrouselStyles.mainWrapper}`}>
         <div className={librarySermonPostCarrouselStyles.scrollSection}>
            {sermonPost.map((sermon: TsermonPost) => (
               <div className={librarySermonPostCarrouselStyles.sermonCompWrapper}>
                  <SermonNotesPost
                     sermonPost={sermon}
                     deleteOption={true}
                     reportOption={true}
                     editOption={true}
                  />
               </div>
            ))}
         </div>
      </div>
   );
};

export default LibrarySermonPostCarrousel;

// core
import React, { useState } from "react";

// components
import Sermon from "../fragments/library-items/sermon";
import ConfirmationPopup from "../fragments/confirmation-popup";

// styles
import librarySermonPostCarrouselStyles from "../styles/posts/SermonPostCarrousel.module.css";
import cardStyles from "../styles/components/Cards.module.css";

// types
import { sermonProps } from "../fragments/library-items/sermon";

type librarySermonCarrouselProps = {
   sermon: sermonProps[];
   deleteOption?: boolean;
   editOption?: boolean;
   reportOption?: boolean;
};
const LibrarySermonPostCarrousel = ({
   sermon,
   editOption,
   deleteOption,
   reportOption
}: librarySermonCarrouselProps) => {
   return (
      <div className={`${librarySermonPostCarrouselStyles.mainWrapper}`}>
         <div className={librarySermonPostCarrouselStyles.scrollSection}>
            {sermon.map((sermon: sermonProps) => (
               <>
                  <Sermon
                     id={sermon.id}
                     key={sermon.id}
                     title={sermon.title}
                     colors={sermon.colors}
                     author={sermon.author}
                     tags={sermon.tags}
                     reviews={sermon.reviews}
                     stars={sermon.stars}
                     file={sermon.file}
                     userAvatar={sermon.userAvatar}
                     reportOption={reportOption}
                     deleteOption={deleteOption}
                     editOption={editOption}
                  />
               </>
            ))}
         </div>
      </div>
   );
};

export default LibrarySermonPostCarrousel;

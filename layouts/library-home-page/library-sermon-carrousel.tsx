// core
import React from "react";

// components
import Sermon from "../../fragments/library-items/sermon";

// styles
import librarySermonCarrouselStyles from "../../styles/layouts/library-home-page/LibrarySermonsCarrousel.module.css";

// types
import { Tsermon } from "../../fragments/library-items/sermon";
type librarySermonCarrouselProps = {
   sermon: Tsermon[];
};
const LibrarySermonCarrousel = ({ sermon }: librarySermonCarrouselProps) => {
   return (
      <div className={`${librarySermonCarrouselStyles.mainWrapper}`}>
         <h1 className={librarySermonCarrouselStyles.title}>SERMON NOTES</h1>
         <div className={librarySermonCarrouselStyles.scrollSection}>
            {sermon.map((sermon: Tsermon) => {
               return <Sermon sermon={sermon} />;
            })}
         </div>
      </div>
   );
};

export default LibrarySermonCarrousel;

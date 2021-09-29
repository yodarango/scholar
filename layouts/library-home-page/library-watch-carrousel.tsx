// core
import React from "react";

// components
import Watch from "../../fragments/library-items/watch";

// styles
import libraryWatchCarrouselStyles from "../../styles/layouts/library-home-page/LibraryWatchCarrousel.module.css";

// types
import { watchProps } from "../../fragments/library-items/watch";
type librarySermonCarrouselProps = {
   watch: watchProps[];
};
const LibraryWatchCarrousel = ({ watch }: librarySermonCarrouselProps) => {
   return (
      <div className={`${libraryWatchCarrouselStyles.mainWrapper}`}>
         <h1 className={libraryWatchCarrouselStyles.title}>VIDEOS</h1>
         <div className={libraryWatchCarrouselStyles.scrollSection}>
            {watch.map((video: watchProps) => {
               return (
                  <Watch
                     id={video.id}
                     key={video.id}
                     userId={video.user.id}
                     title={video.title}
                     by={video.user === null ? "" : video.user.fullName}
                     thumbnail={video.thumbnail}
                     currentRanking={video.currentRanking}
                     sermonUrl={video.sermonUrl}
                  />
               );
            })}
         </div>
      </div>
   );
};

export default LibraryWatchCarrousel;

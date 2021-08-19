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
            {watch.map((video: watchProps) => (
               <Watch
                  id={video.id}
                  key={video.id}
                  title={video.title}
                  by={video.by}
                  thumbnail={video.thumbnail}
                  reviews={video.reviews}
                  stars={video.stars}
                  url={video.url}
               />
            ))}
         </div>
      </div>
   );
};

export default LibraryWatchCarrousel;

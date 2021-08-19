// core
import React from "react";

// components
import Sermon from "../../fragments/library-items/sermon";

// styles
import librarySermonCarrouselStyles from "../../styles/layouts/library-home-page/LibrarySermonsCarrousel.module.css";

// types
import { sermonProps } from "../../fragments/library-items/sermon";
type librarySermonCarrouselProps = {
   sermon: sermonProps[];
};
const LibrarySermonCarrousel = ({ sermon }: librarySermonCarrouselProps) => {
   return (
      <div className={`${librarySermonCarrouselStyles.mainWrapper}`}>
         <h1 className={librarySermonCarrouselStyles.title}>SERMON NOTES</h1>
         <div className={librarySermonCarrouselStyles.scrollSection}>
            {sermon.map((sermon: sermonProps) => (
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
               />
            ))}
         </div>
      </div>
   );
};

export default LibrarySermonCarrousel;

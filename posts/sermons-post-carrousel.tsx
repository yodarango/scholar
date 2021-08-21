// core
import React from "react";

// components
import Sermon from "../fragments/library-items/sermon";

// styles
import librarySermonPostCarrouselStyles from "../styles/posts/SermonPostCarrousel.module.css";

// types
import { sermonProps } from "../fragments/library-items/sermon";
type librarySermonCarrouselProps = {
   sermon: sermonProps[];
};
const LibrarySermonPostCarrousel = ({ sermon }: librarySermonCarrouselProps) => {
   return (
      <div className={`${librarySermonPostCarrouselStyles.mainWrapper}`}>
         <div className={librarySermonPostCarrouselStyles.scrollSection}>
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
                  userAvatar={sermon.userAvatar}
               />
            ))}
         </div>
      </div>
   );
};

export default LibrarySermonPostCarrousel;

import React from "react";

//components
import Sermon from "../fragments/library-items/sermon";

// styles
import sermonsCarrouselStyles from "../styles/layouts/SermonsCarrousel.module.css";

// types
import { sermonProps } from "../fragments/library-items/sermon";

type sermonCarrouselProps = {
   sermon: sermonProps[];
};

const SermonsCarrousel = ({ sermon }: sermonCarrouselProps) => {
   return (
      <div className={sermonsCarrouselStyles.mainWrapper}>
         <div className={sermonsCarrouselStyles.gridWrapper}>
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
                  newClass={sermonsCarrouselStyles.sermonWRapper}
               />
            ))}

            {/* ====== TEMPORARY data jsut to create more content ======= */}
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
                  newClass={sermonsCarrouselStyles.sermonWRapper}
               />
            ))}
         </div>
      </div>
   );
};

export default SermonsCarrousel;

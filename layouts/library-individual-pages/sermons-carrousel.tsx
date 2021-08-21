// ************************** PURPOSE **************************** //
// *** This is only a wrapper to display each individual ********* //
// *** sermon component by calling a map on the props  *********** //
// *** passed in this component, which is an array of the ******** //
// *** sermon fetched from the library. ************************** //

// core
import React from "react";

//components
import Sermon from "../../fragments/library-items/sermon";

// styles
import sermonsCarrouselStyles from "../../styles/layouts/library-individual-pages/SermonsCarrousel.module.css";

// types
import { sermonProps } from "../../fragments/library-items/sermon";

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
                  userAvatar={sermon.userAvatar}
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
                  userAvatar={sermon.userAvatar}
               />
            ))}
         </div>
      </div>
   );
};

export default SermonsCarrousel;

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
   editOption?: boolean;
   deleteOption?: boolean;
   reportOption?: boolean;
};

const SermonsCarrousel = ({
   sermon,
   editOption,
   deleteOption,
   reportOption
}: sermonCarrouselProps) => {
   return (
      <div className={sermonsCarrouselStyles.mainWrapper}>
         <div className={sermonsCarrouselStyles.gridWrapper}>
            {sermon.map((sermon: sermonProps) => (
               <Sermon
                  id={sermon.id}
                  key={sermon.id}
                  title={sermon.title}
                  tagColors={sermon.tagColors}
                  author={sermon.user === null ? "" : sermon.user.fullName}
                  categoryTags={sermon.categoryTags}
                  currentRanking={sermon.currentRanking}
                  fileUrl={sermon.fileUrl}
                  newClass={sermonsCarrouselStyles.sermonWRapper}
                  userAvatar={sermon.user === null ? "" : sermon.user.avatar}
                  editOption={editOption}
                  deleteOption={deleteOption}
                  reportOption={reportOption}
               />
            ))}
         </div>
      </div>
   );
};

export default SermonsCarrousel;

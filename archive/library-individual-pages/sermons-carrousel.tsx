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
import { Tsermon } from "../../fragments/library-items/sermon";

type sermonCarrouselProps = {
   sermon: Tsermon[];
};

const SermonsCarrousel = ({ sermon }: sermonCarrouselProps) => {
   return (
      <div className={sermonsCarrouselStyles.mainWrapper}>
         {sermon.length > 0 && (
            <div className={sermonsCarrouselStyles.gridWrapper}>
               {sermon.map((sermon: Tsermon) => (
                  <Sermon sermon={sermon} />
               ))}
            </div>
         )}
         {sermon.length === 0 && <h2 className={"no-content-text"}>no content found</h2>}
      </div>
   );
};

export default SermonsCarrousel;

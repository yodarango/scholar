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
            {sermon.map((sermon: Tsermon) => (
               <Sermon sermon={sermon} />
            ))}
         </div>
      </div>
   );
};

export default SermonsCarrousel;

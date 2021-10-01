// ************************** PURPOSE **************************** //
// *** This is only a wrapper to display each individual ********* //
// *** watch component by calling a map on the props  ************ //
// *** passed in this component, which is an array of the ******** //
// *** watch fetched from the library. *************************** //

// core
import React from "react";

//components
import Congregation from "../../fragments/library-items/congregation";

// styles
import congregationCarrouselStyles from "../../styles/layouts/library-individual-pages/CongregationCarrousel.module.css";

// helpers:types
import { congregationProps } from "../../fragments/library-items/congregation";

type congregationCarrouselProps = {
   congregation: congregationProps[];
};

const CongregationCarrousel = ({ congregation }: congregationCarrouselProps) => {
   console.log(congregation);
   return (
      <div className={congregationCarrouselStyles.mainWrapper}>
         <div className={congregationCarrouselStyles.gridWrapper}>
            {congregation.map((congregation: congregationProps) => (
               <Congregation
                  id={congregation.id}
                  key={congregation.id}
                  logo={congregation.logo}
                  name={congregation.name}
                  schedule={congregation.schedule}
                  state={congregation.state}
                  zip={congregation.zip}
                  city={congregation.city}
                  address={congregation.address}
                  location={congregation.location}
                  website={congregation.website}
                  iFrame={congregation.iFrame}
               />
            ))}
         </div>
      </div>
   );
};

export default CongregationCarrousel;

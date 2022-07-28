// core
import React from "react";
import Image from "next/image";

// components
import Sermon from "../../fragments/library-items/sermon";
import CardsLazyLoading from "../cards-lazy-loading";
import ResourceNotFoundError from "../../fragments/chunks/error_resource_not_found";

// styles
import librarySermonCarrouselStyles from "../../styles/layouts/library-home-page/LibrarySermonsCarrousel.module.css";
import cardsLazyLoadingStyle from "../../styles/layouts/CardsLazyLoading.module.css";

// types
import { Tsermon } from "../../fragments/library-items/sermon";

type librarySermonCarrouselProps = {
   sermon: Tsermon[] | undefined;
   err: boolean;
};
const LibrarySermonCarrousel = ({ sermon, err }: librarySermonCarrouselProps) => {
   return (
      <div className={`${librarySermonCarrouselStyles.mainWrapper}`}>
         <h1 className={librarySermonCarrouselStyles.title}>SERMON NOTES</h1>
         <div className={librarySermonCarrouselStyles.scrollSection}>
            {sermon &&
               sermon.map((sermon: Tsermon) => {
                  return <Sermon sermon={sermon} />;
               })}
            {!sermon && !err && (
               <CardsLazyLoading
                  amount={10}
                  compClass={cardsLazyLoadingStyle.libraryHomePageSquare}
               />
            )}

            {err && <ResourceNotFoundError />}
         </div>
      </div>
   );
};

export default LibrarySermonCarrousel;

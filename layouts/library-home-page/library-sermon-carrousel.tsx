// core
import React from "react";
import Image from "next/image";

// components
import Sermon from "../../fragments/library-items/sermon";
import CardsLazyLoading from "../cards-lazy-loading";

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

            {err && (
               <div className={cardsLazyLoadingStyle.errorImage}>
                  <Image layout='fill' alt='resource not found' src={"/Parks10.png"} />
               </div>
            )}
         </div>
      </div>
   );
};

export default LibrarySermonCarrousel;

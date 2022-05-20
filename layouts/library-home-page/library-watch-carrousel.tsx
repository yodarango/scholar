// core
import React from "react";
import Image from "next/image";

// components
import Watch from "../../fragments/library-items/watch";
import CardsLazyLoading from "../../layouts/cards-lazy-loading";
import ResourceNotFoundError from "../resource-not-found-error";

// styles
import libraryWatchCarrouselStyles from "../../styles/layouts/library-home-page/LibraryWatchCarrousel.module.css";
import cardsLazyLoadingStyle from "../../styles/layouts/CardsLazyLoading.module.css";

// types
import { watchProps } from "../../fragments/library-items/watch";

type librarySermonCarrouselProps = {
   watch: watchProps[] | undefined;
   err: boolean;
};
const LibraryWatchCarrousel = ({ watch, err }: librarySermonCarrouselProps) => {
   return (
      <div className={`${libraryWatchCarrouselStyles.mainWrapper}`}>
         <h1 className={libraryWatchCarrouselStyles.title}>SERMONS</h1>
         <div className={libraryWatchCarrouselStyles.scrollSection}>
            {watch &&
               watch.map((video: watchProps) => {
                  return (
                     <Watch
                        id={video.id}
                        key={video.id}
                        userId={video.user.id}
                        title={video.title}
                        by={video.user === null ? "" : video.user.fullName}
                        thumbnail={video.thumbnail}
                        currentRanking={video.currentRanking}
                        totalReviews={video.totalReviews}
                        sermonUrl={video.sermonUrl}
                     />
                  );
               })}
            {!watch && !err && (
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

export default LibraryWatchCarrousel;

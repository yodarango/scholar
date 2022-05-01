// core
import React from "react";
import Image from "next/image";

// components
import Podcast from "../../fragments/library-items/podcast";
import CardsLazyLoading from "../../layouts/cards-lazy-loading";

// styles
import libraryContentCarrouselStyles from "../../styles/layouts/library-home-page/LibraryContentCarrousel.module.css";
import cardsLazyLoadingStyle from "../../styles/layouts/CardsLazyLoading.module.css";

// types
import { podcastsProps } from "../../fragments/library-items/podcast";

type LibraryPodcastCarrouselProps = {
   podcasts: podcastsProps[] | undefined;
   err: boolean;
};
const LibraryPodcastCarrousel = ({ podcasts, err }: LibraryPodcastCarrouselProps) => {
   // ===============   FUNCTION 1: fetch the podcast =====================//
   return (
      <div className={`${libraryContentCarrouselStyles.mainWrapper}`}>
         <h1 className={libraryContentCarrouselStyles.title}>PODCASTS</h1>
         <div className={libraryContentCarrouselStyles.scrollSection}>
            {podcasts &&
               podcasts.map((podcast: any) => {
                  return (
                     <div id={`${podcast.totalReviews}`} key={podcast.id}>
                        <Podcast
                           key={podcast.id}
                           id={podcast.id}
                           thumbnail={podcast.thumbnail}
                           podcastName={podcast.podcastName}
                           host={podcast.user === null ? "" : podcast.user.fullName}
                           currentRanking={podcast.currentRanking}
                           totalReviews={podcast.totalReviews}
                           description={podcast.description}
                           appleLink={podcast.appleLink}
                           spotifyLink={podcast.spotifyLink}
                           googleLink={podcast.googleLink}
                           overcastLink={podcast.overcastLink}
                        />
                     </div>
                  );
               })}

            {!podcasts && !err && (
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

export default LibraryPodcastCarrousel;

// core
import React from "react";

// components
import Podcast from "../../fragments/library-items/podcast";

// styles
import libraryContentCarrouselStyles from "../../styles/layouts/library-home-page/LibraryContentCarrousel.module.css";

// types
import { podcastsProps } from "../../fragments/library-items/podcast";

type LibraryPodcastCarrouselProps = {
   podcasts: podcastsProps[];
};
const LibraryPodcastCarrousel = ({ podcasts }: LibraryPodcastCarrouselProps) => {
   // ===============   FUNCTION 1: fetch the podcast =====================//
   console.log("from carrousel: ", podcasts);
   return (
      <div className={`${libraryContentCarrouselStyles.mainWrapper}`}>
         <h1 className={libraryContentCarrouselStyles.title}>PODCASTS</h1>
         <div className={libraryContentCarrouselStyles.scrollSection}>
            {podcasts.map((podcast: any) => {
               console.log(podcast.totalReviews);
               return (
                  <div id={`${podcast.totalReviews}`} className={"here"}>
                     <Podcast
                        key={podcast.id}
                        id={podcast.id}
                        thumbnail={podcast.thumbnail}
                        podcastName={podcast.podcastName}
                        host={podcast.user === null ? "" : podcast.user}
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
         </div>
      </div>
   );
};

export default LibraryPodcastCarrousel;

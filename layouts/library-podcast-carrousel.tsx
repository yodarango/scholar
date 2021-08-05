// core
import React from "react";

// components
import Podcast from "../fragments/library-items/podcast";

// styles
import libraryContentCarrouselStyles from "../styles/layouts/LibraryContentCarrousel.module.css";

// types
import { PodcastsProps } from "../fragments/library-items/podcast";

type LibraryPodcastCarrouselProps = {
   podcasts: PodcastsProps[];
};
const LibraryPodcastCarrousel = ({ podcasts }: LibraryPodcastCarrouselProps) => {
   // ===============   FUNCTION 1: fetch the podcast =====================//
   return (
      <div className={`${libraryContentCarrouselStyles.mainWrapper}`}>
         <h1 className={libraryContentCarrouselStyles.title}>PODCASTS</h1>
         <div className={libraryContentCarrouselStyles.scrollSection}>
            {podcasts.map((podcast: any) => (
               <Podcast
                  key={podcast.id}
                  id={podcast.id}
                  thumbnail={podcast.thumbnail}
                  podcastName={podcast.podcastName}
                  host={podcast.host}
                  reviews={podcast.reviews}
                  stars={podcast.stars}
                  description={podcast.description}
                  appleLink={podcast.appleLink}
                  spotifyLink={podcast.spotifyLink}
                  googleLink={podcast.googleLink}
                  overcastLink={podcast.overcastLink}
                  fetchUrl={"https://scholar-be.herokuapp.com/library"}
               />
            ))}
         </div>
      </div>
   );
};

export default LibraryPodcastCarrousel;

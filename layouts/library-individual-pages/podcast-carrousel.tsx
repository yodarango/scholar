// ************************** PURPOSE **************************** //
// *** This is only a wrapper to display each individual ********* //
// *** article component by calling a map on the props  ********** //
// *** passed in this component, which is an array of the ******** //
// *** article fetched from the library. ************************* //

// core
import React from "react";

//components
import Podcasts from "../../fragments/library-items/podcast";

// styles
import podcastCarrouselStyles from "../../styles/layouts/library-individual-pages/PodcastCarrousel.module.css";

// helpers:types
import { podcastsProps } from "../../fragments/library-items/podcast";

type podcastCarrouselProps = {
   podcast: podcastsProps[];
};

const PodcastCarrousel = ({ podcast }: podcastCarrouselProps) => {
   return (
      <div className={podcastCarrouselStyles.mainWrapper}>
         <div className={podcastCarrouselStyles.gridWrapper}>
            {podcast.map((podcast: podcastsProps) => (
               <Podcasts
                  id={podcast.id}
                  thumbnail={podcast.thumbnail}
                  podcastName={podcast.podcastName}
                  host={podcast.host}
                  currentRanking={podcast.currentRanking}
                  description={podcast.description}
                  appleLink={podcast.appleLink}
                  spotifyLink={podcast.spotifyLink}
                  googleLink={podcast.googleLink}
                  overcastLink={podcast.overcastLink}
                  newClass={podcastCarrouselStyles.podcastWrapper}
               />
            ))}
         </div>
      </div>
   );
};

export default PodcastCarrousel;

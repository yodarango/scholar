import React, { useState, useEffect, useRef } from "react";

// styles
import podcastStyles from "../../styles/fragments/library-items/Podcast.module.css";

// components
import StarReviews from "../star-reviews";

export type PodcastsProps = {
   id: string;
   thumbnail: string;
   podcastName: string;
   host: string;
   reviews: string[];
   stars: number[];
   description: string;
   appleLink: string;
   spotifyLink: string;
   googleLink: string;
   overcastLink: string;
};

const Podcasts = ({
   id,
   thumbnail,
   podcastName,
   host,
   reviews,
   stars,
   description,
   appleLink,
   spotifyLink,
   googleLink,
   overcastLink
}: PodcastsProps) => {
   // ===============   FUNCTIOn: 1 Open the podcast review   =============//
   const [openPodcastDescState, setOpenPodcastDescState] = useState<JSX.Element | boolean>(false);

   const handleOpenDescription = () => {
      setOpenPodcastDescState(
         <div className={`${podcastStyles.descPopup}`} key={id}>
            <div
               className={`${podcastStyles.descPopupCloseModal} closeModal`}
               onClick={() => setOpenPodcastDescState(false)}>
               X
            </div>
            <h1 className={`${podcastStyles.descPopupTitle}`}>{podcastName}</h1>
            <h3 className={podcastStyles.popUpHost}>Podcast By: {host}</h3>
            <img
               src={thumbnail}
               alt='podcast thumbnail'
               className={`${podcastStyles.descPopupImg}`}
            />
            <div className={podcastStyles.starReviewWrapper}>
               <StarReviews contentId={id} reviews={reviews} stars={stars} />
            </div>
            <section className={podcastStyles.popupDescription}>{description}</section>
            <p className={`std-text-block--info ${podcastStyles.descPopupFooter}`}>
               You can find {podcastName} in all the following platforms:
            </p>
            <div className={podcastStyles.links}>
               {appleLink && (
                  <a href={appleLink} target='_blank' rel='noopener noreferrer'>
                     <span className={podcastStyles.linksApple}></span>
                  </a>
               )}
               {spotifyLink && (
                  <a href={spotifyLink} target='_blank' rel='noopener noreferrer'>
                     <span className={podcastStyles.linksSpotify}></span>
                  </a>
               )}
               {googleLink && (
                  <a href={googleLink} target='_blank' rel='noopener noreferrer'>
                     <span className={podcastStyles.linksGoogle}></span>
                  </a>
               )}
               {overcastLink && (
                  <a href={overcastLink} target='_blank' rel='noopener noreferrer'>
                     <span className={podcastStyles.linksOvercast}></span>
                  </a>
               )}
            </div>
         </div>
      );
   };
   return (
      <>
         {openPodcastDescState}
         <div className={`${podcastStyles.mainWrapper}`}>
            <div className={podcastStyles.thumbnailWrapper} onClick={handleOpenDescription}>
               <img src={thumbnail} alt='podcast thumbnail' className={podcastStyles.thumbnail} />
            </div>
            <StarReviews contentId={id} reviews={reviews} stars={stars} />
            <h2 className={podcastStyles.name}>{podcastName}</h2>
            <h3 className={podcastStyles.host}>{host}</h3>
            <div className={podcastStyles.links}>
               {appleLink && (
                  <a href={appleLink} target='_blank' rel='noopener noreferrer'>
                     <span className={podcastStyles.linksApple}></span>
                  </a>
               )}
               {spotifyLink && (
                  <a href={spotifyLink} target='_blank' rel='noopener noreferrer'>
                     <span className={podcastStyles.linksSpotify}></span>
                  </a>
               )}
               {googleLink && (
                  <a href={googleLink} target='_blank' rel='noopener noreferrer'>
                     <span className={podcastStyles.linksGoogle}></span>
                  </a>
               )}
               {overcastLink && (
                  <a href={overcastLink} target='_blank' rel='noopener noreferrer'>
                     <span className={podcastStyles.linksOvercast}></span>
                  </a>
               )}
            </div>
         </div>
      </>
   );
};

export default Podcasts;

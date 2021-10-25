// core
import React, { useState } from "react";

// components
import LibraryReviewContent from "./buttons/library-review-content";

// styles
import starReviewsStyles from "../styles/fragments/StarReviews.module.css";

type starReviewsProps = {
   currentRanking?: Number;
   contentId: string;
};

// handle the review calculation to display the right amount of stars
const starReviews = ({ currentRanking, contentId }: starReviewsProps) => {
   let starClass: string = "";
   if (currentRanking) {
      //currentRanking === 0 ? (starClass = starReviewsStyles.zeroStar) : null;
      currentRanking > 0 && currentRanking < 1 ? (starClass = starReviewsStyles.halfStar) : null; // 0.5 stars
      currentRanking === 1 ? (starClass = starReviewsStyles.oneStar) : null; // 1 star
      currentRanking > 1 && currentRanking < 2 ? (starClass = starReviewsStyles.oneHalfStar) : null; // 1.5 stars
      currentRanking === 2 ? (starClass = starReviewsStyles.twoStar) : null; // 2stars
      currentRanking > 2 && currentRanking < 3 ? (starClass = starReviewsStyles.twoHalfStar) : null; // 2.5 stars

      currentRanking === 3 ? (starClass = starReviewsStyles.threeStar) : null; // 3 stars
      currentRanking > 3 && currentRanking < 4
         ? (starClass = starReviewsStyles.threeHalfStar)
         : null; // 3.5 stars
      currentRanking === 4 ? (starClass = starReviewsStyles.fourStar) : null; // 4 stars
      currentRanking > 4 && currentRanking < 5
         ? (starClass = starReviewsStyles.fourHalfStar)
         : null; // 4.5 stars
      currentRanking === 5 ? (starClass = starReviewsStyles.fiveStar) : null; // 5 stars
   }
   // ==============   FUNCTION: 1 open the popup that will allow users to submit their review ====== //
   const [openReviewPopupState, setOpenReviewPopupState] = useState<boolean | JSX.Element>(false);
   const handleOpenReviewPopup = () => {
      setOpenReviewPopupState(
         <LibraryReviewContent
            contentId={contentId}
            closeModal={() => setOpenReviewPopupState(false)}
         />
      );
   };
   return (
      <>
         {openReviewPopupState}
         <div className={starReviewsStyles.mainWrapper} onClick={handleOpenReviewPopup}>
            {currentRanking === null && (
               <p className={`${starReviewsStyles.noReviews} std-text-block--info`}>
                  No reviews yet!
               </p>
            )}
            {currentRanking === 0 && (
               <p className={`${starReviewsStyles.noReviews} std-text-block--info`}>
                  No reviews yet!
               </p>
            )}
            {starClass !== "" && <div className={`${starClass}`}></div>}
         </div>
      </>
   );
};

export default starReviews;

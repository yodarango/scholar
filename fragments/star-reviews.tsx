// core
import React, { useState } from "react";

// components
import LibraryReviewContent from "./buttons/library-review-content";

// styles
import starReviewsStyles from "../styles/fragments/StarReviews.module.css";

type starReviewsProps = {
   stars: number[];
   reviews: string[];
   contentId: string;
};

// handle the review calculation to display the right amount of stars
const starReviews = ({ stars, reviews, contentId }: starReviewsProps) => {
   const possibleStars: number = reviews.length * 5;
   let actualStars: number = 0;
   stars.map((star: number) => (actualStars = actualStars + star));
   const totalWholeStars: number = (actualStars / possibleStars / 2) * 10;

   let starClass: string = "";
   totalWholeStars === 0 ? (starClass = starReviewsStyles.zeroStar) : null;
   totalWholeStars > 0 && totalWholeStars < 1 ? (starClass = starReviewsStyles.halfStar) : null; // 0.5 stars
   totalWholeStars === 1 ? (starClass = starReviewsStyles.oneStar) : null; // 1 star
   totalWholeStars > 1 && totalWholeStars < 2 ? (starClass = starReviewsStyles.oneHalfStar) : null; // 1.5 stars
   totalWholeStars === 2 ? (starClass = starReviewsStyles.twoStar) : null; // 2stars
   totalWholeStars > 2 && totalWholeStars < 3 ? (starClass = starReviewsStyles.twoHalfStar) : null; // 2.5 stars

   totalWholeStars === 3 ? (starClass = starReviewsStyles.threeStar) : null; // 3 stars
   totalWholeStars > 3 && totalWholeStars < 4
      ? (starClass = starReviewsStyles.threeHalfStar)
      : null; // 3.5 stars
   totalWholeStars === 4 ? (starClass = starReviewsStyles.fourStar) : null; // 4 stars
   totalWholeStars > 4 && totalWholeStars < 5 ? (starClass = starReviewsStyles.fourHalfStar) : null; // 4.5 stars
   totalWholeStars === 5 ? (starClass = starReviewsStyles.fiveStar) : null; // 5 stars

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
            {totalWholeStars === 0 && (
               <p className={`${starReviewsStyles.noReviews} std-text-block--info`}>
                  No reviews yet!
               </p>
            )}
            <div className={starClass}></div>
         </div>
      </>
   );
};

export default starReviews;

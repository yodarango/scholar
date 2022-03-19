// core
import React, { useState } from "react";

// components
import LibraryReviewContent from "./buttons/library-review-content";

// styles
import starReviewsStyles from "../styles/fragments/StarReviews.module.css";
import NotificationPopup from "./notification-popup";

type starReviewsProps = {
   currentRanking?: Number;
   contentId: string;
   totalReviews: Number;
   contentType: string;
};

// handle the review calculation to display the right amount of stars
const starReviews = ({
   currentRanking,
   contentType,
   contentId,
   totalReviews
}: starReviewsProps) => {
   // notifiation state
   const [notificationPopUpState, setNotificationPopUpState] = useState<boolean | JSX.Element>(
      false
   );
   let starClass: string = "";
   const [displayCurrentRanking, setDisplayCurrentRanking] = useState<Number | undefined>(
      currentRanking
   );

   if (displayCurrentRanking) {
      //displayCurrentRanking === 0 ? (starClass = starReviewsStyles.zeroStar) : null;
      displayCurrentRanking > 0 && displayCurrentRanking < 0.5
         ? (starClass = starReviewsStyles.halfStar)
         : null; // 0.5 stars
      displayCurrentRanking >= 1 ? (starClass = starReviewsStyles.oneStar) : null; // 1 star
      displayCurrentRanking >= 1.5 && displayCurrentRanking < 2
         ? (starClass = starReviewsStyles.oneHalfStar)
         : null; // 1.5 stars
      displayCurrentRanking >= 2 ? (starClass = starReviewsStyles.twoStar) : null; // 2stars
      displayCurrentRanking >= 2.5 && displayCurrentRanking < 3
         ? (starClass = starReviewsStyles.twoHalfStar)
         : null; // 2.5 stars
      displayCurrentRanking >= 3 ? (starClass = starReviewsStyles.threeStar) : null; // 3 stars
      displayCurrentRanking >= 3.5 && displayCurrentRanking < 4
         ? (starClass = starReviewsStyles.threeHalfStar)
         : null; // 3.5 stars
      displayCurrentRanking >= 4 ? (starClass = starReviewsStyles.fourStar) : null; // 4 stars
      displayCurrentRanking >= 4.5 && displayCurrentRanking < 4.8
         ? (starClass = starReviewsStyles.fourHalfStar)
         : null; // 4.5 stars
      displayCurrentRanking >= 4.8 ? (starClass = starReviewsStyles.fiveStar) : null; // 5 stars
   }
   // ==============   FUNCTION: 1 open the popup that will allow users to submit their review ====== //
   const [openReviewPopupState, setOpenReviewPopupState] = useState<boolean | JSX.Element>(false);
   const handleOpenReviewPopup = () => {
      setOpenReviewPopupState(
         <LibraryReviewContent
            handleSuccessfulRanking={handleSuccessfulRanking}
            contentId={contentId}
            contentType={contentType}
            closeModal={() => setOpenReviewPopupState(false)}
         />
      );
   };

   // ---------------------- Function 2 : Handle the successful reanking -------------------------
   const handleSuccessfulRanking = (newRaking: number) => {
      setOpenReviewPopupState(false);
      setDisplayCurrentRanking(newRaking);
      setNotificationPopUpState(
         <NotificationPopup
            title='Success!'
            newClass='notification-wrapper--Success'
            contentString='Thank you for rating this content 🎖'
            closeModal={() => setNotificationPopUpState(false)}
         />
      );
   };

   return (
      <>
         {notificationPopUpState}
         {openReviewPopupState}
         <div className={starReviewsStyles.mainWrapper} onClick={handleOpenReviewPopup}>
            {displayCurrentRanking === null && (
               <p className={`${starReviewsStyles.noReviews} std-text-block--info`}>
                  No reviews yet!
               </p>
            )}
            {displayCurrentRanking === 0 && (
               <p className={`${starReviewsStyles.noReviews} std-text-block--info`}>
                  No reviews yet!
               </p>
            )}
            {starClass !== "" && (
               <>
                  <div className={`${starClass}`}></div> <span>{totalReviews}</span>
               </>
            )}
         </div>
      </>
   );
};

export default starReviews;

// core
import React, { useState } from "react";

// graphQL
import client from "../../apollo-client";
import { HANDLE_CONTENT_REVIEW } from "../../graphql/library/shared";

// style
import libraryRecommendContenntStyles from "../../styles/buttons/LibraryReviewContent.module.css";

type libraryReviewContentProps = {
   contentId: string;
   contentType: String;
   handleSuccessfulRanking: any;
   closeModal: React.MouseEventHandler;
};

const LibraryReviewContent = ({
   contentId,
   contentType,
   closeModal,
   handleSuccessfulRanking
}: libraryReviewContentProps) => {
   // ============ FUNCTION 1: Handle POST request on star click
   const [slidingLineClassState, setSlidingLineClassState] = useState<string>("");

   type IhideReviewSliderState = {
      newClass: string;
      message: string;
      bkgColor: string;
      newHeight: string;
   };
   const [hideReviewSliderState, setHideReviewSliderState] = useState<IhideReviewSliderState>({
      newClass: "",
      message: "",
      bkgColor: "",
      newHeight: ""
   });
   const handleReviewClick = async (review: number, newclass: string, _id: string) => {
      // change the color of the bar on click
      setSlidingLineClassState(newclass);
      try {
         const { data } = await client.mutate({
            mutation: HANDLE_CONTENT_REVIEW,
            variables: {
               contentId: _id,
               starsRated: review,
               contentType: contentType
            }
         });

         //handle a sucessful notification
         if (data.handleContentReview) {
            handleSuccessfulRanking(data.handleContentReview.newRating);
         }
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <div
         className={libraryRecommendContenntStyles.mainWrapper}
         style={{
            backgroundColor: hideReviewSliderState.bkgColor,
            height: hideReviewSliderState.newHeight
         }}>
         <div
            className={`closeModal ${libraryRecommendContenntStyles.closeModal}`}
            onClick={closeModal}>
            X
         </div>
         <h2
            className={`${libraryRecommendContenntStyles.title}`}
            style={{ display: hideReviewSliderState.newClass }}>
            Review This Content
         </h2>
         <div
            className={`${libraryRecommendContenntStyles.starWrapper}`}
            style={{ display: hideReviewSliderState.newClass }}>
            <div
               className={`${libraryRecommendContenntStyles.slidingLine} ${slidingLineClassState}`}>
               <span
                  className={`${libraryRecommendContenntStyles.halfStar}`}
                  onClick={() =>
                     handleReviewClick(
                        0.5,
                        libraryRecommendContenntStyles.selectionClassHalf,
                        contentId
                     )
                  }></span>
               <span
                  className={`${libraryRecommendContenntStyles.oneStar}`}
                  onClick={() =>
                     handleReviewClick(
                        1,
                        libraryRecommendContenntStyles.selectionClassOne,
                        contentId
                     )
                  }></span>
               <span
                  className={`${libraryRecommendContenntStyles.oneHalfStar}`}
                  onClick={() =>
                     handleReviewClick(
                        1.5,
                        libraryRecommendContenntStyles.selectionClassOneHalf,
                        contentId
                     )
                  }></span>
               <span
                  className={`${libraryRecommendContenntStyles.twoStar}`}
                  onClick={() =>
                     handleReviewClick(
                        2,
                        libraryRecommendContenntStyles.selectionClassTwo,
                        contentId
                     )
                  }></span>
               <span
                  className={`${libraryRecommendContenntStyles.twoHalfStar}`}
                  onClick={() =>
                     handleReviewClick(
                        2.5,
                        libraryRecommendContenntStyles.selectionClassTwoHalf,
                        contentId
                     )
                  }></span>
               <span
                  className={`${libraryRecommendContenntStyles.threeStar}`}
                  onClick={() =>
                     handleReviewClick(
                        3,
                        libraryRecommendContenntStyles.selectionClassThree,
                        contentId
                     )
                  }></span>
               <span
                  className={`${libraryRecommendContenntStyles.threeHalfStar}`}
                  onClick={() =>
                     handleReviewClick(
                        3,
                        libraryRecommendContenntStyles.selectionClassThreeHalf,
                        contentId
                     )
                  }></span>
               <span
                  className={`${libraryRecommendContenntStyles.fourStar}`}
                  onClick={() =>
                     handleReviewClick(
                        4,
                        libraryRecommendContenntStyles.selectionClassFour,
                        contentId
                     )
                  }></span>
               <span
                  className={`${libraryRecommendContenntStyles.fourHalfStar}`}
                  onClick={() =>
                     handleReviewClick(
                        4.5,
                        libraryRecommendContenntStyles.selectionClassFourHalf,
                        contentId
                     )
                  }></span>
               <span
                  className={`${libraryRecommendContenntStyles.fiveStar}`}
                  onClick={() =>
                     handleReviewClick(
                        5,
                        libraryRecommendContenntStyles.selectionClassFive,
                        contentId
                     )
                  }></span>
            </div>
         </div>
         <p className='std-text-block'>{hideReviewSliderState.message}</p>
         <div
            className={`${libraryRecommendContenntStyles.starWrapperBehind}`}
            style={{ display: hideReviewSliderState.newClass }}></div>
      </div>
   );
};

export default LibraryReviewContent;

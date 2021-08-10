// core
import React, { useState } from "react";

// style
import libraryRecommendContenntStyles from "../../styles/buttons/LibraryReviewContent.module.css";

type libraryReviewContentProps = {
   contentId: string;
   closeModal: React.MouseEventHandler;
};

const LibraryReviewContent = ({ contentId, closeModal }: libraryReviewContentProps) => {
   // ============ FUNCTION 1: Handle POS request on star click
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
   const handleReviewClick = async (review: number, newclass: string, id: string) => {
      await fetch("https://scholar-be.herokuapp.com/recommend-new-resource", {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({ contentId: id, review: review, userId: "1245" })
      });

      // change the color of the bar on click
      setSlidingLineClassState(newclass);

      // notify the user about the successful submission
      setTimeout(() => {
         setHideReviewSliderState({
            newClass: "none",
            message: "Thank you for submitting your review 😃",
            bkgColor: "green",
            newHeight: "10rem"
         });
      }, 1500);
   };

   return (
      <div
         className={libraryRecommendContenntStyles.mainWrapper}
         style={{
            backgroundColor: hideReviewSliderState.bkgColor,
            height: hideReviewSliderState.newHeight
         }}>
         <div className={`closeModal`} onClick={closeModal}>
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

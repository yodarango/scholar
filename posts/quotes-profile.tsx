// core
import React, { useState } from "react";

// components
import QuoteViewProfile from "./quotes-view-profile";
import ConfirmationPopup from "../fragments/confirmation-popup";

// styles
import quoteProfileStyles from "../styles/posts/QuotesProfile.module.css";
import { quoteViewProfileProps } from "./quotes-view-profile";

export type TsingleStory = {
   id: string;
   content: string;
   by: string;
   background: string;
   tags: string[];
   approves: string[];
   disapproves: string[];
   comments: [
      id: string,
      userId: string,
      userAvatar: string,
      userSignature: string,
      content: string
   ];
};

type quoteProfileProps = {
   story: TsingleStory;
};
const QuotesProfile = ({ story }: quoteProfileProps) => {
   // ================   FUNCTION 1: handle the More Click and show the full screen story   ============= //
   const [morePopUpState, setMorePopUpState] = useState<boolean>(false);
   const handleMoreClick = () => {
      setMorePopUpState(true);
      document.body.style.overflow = "hidden";
   };

   //    ==================   FUNCTION 2: Close th Stories on sull view     =============  //
   const handleCloseStories = () => {
      setMorePopUpState(false);
      document.body.style.overflow = "scroll";
   };

   //    ==================   FUNCTION 3: Delete Popup for quote    =============  //
   const [deletePopUp, setDeletePopUp] = useState<boolean>(false);
   const handleDeleteQuote = () => {
      setDeletePopUp(true);
   };

   return (
      <>
         {morePopUpState && (
            <QuoteViewProfile story={story} handleCloseStories={handleCloseStories} />
         )}
         {deletePopUp && (
            <ConfirmationPopup
               cancel={() => setDeletePopUp(false)}
               title={"Are you sure you want to delete this quote?"}
            />
         )}
         <div className={quoteProfileStyles.mainWrapper}>
            <h3 className={quoteProfileStyles.title}>{story.by}</h3>
            <div
               className={quoteProfileStyles.content}
               style={{ backgroundImage: story.background }}>
               {story.content}
            </div>
            <section className={quoteProfileStyles.actionsWrapper}>
               <span
                  className={`std-vector-icon ${quoteProfileStyles.more}`}
                  onClick={handleMoreClick}></span>
               <span
                  className={`std-vector-icon ${quoteProfileStyles.delete}`}
                  onClick={handleDeleteQuote}></span>
               <span className={`std-vector-icon ${quoteProfileStyles.edit}`}></span>
            </section>
         </div>
      </>
   );
};

export default QuotesProfile;

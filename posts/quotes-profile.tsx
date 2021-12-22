// core
import React, { useState } from "react";

// components
import QuoteViewProfile from "./quotes-view-profile";
import ConfirmationPopup from "../fragments/confirmation-popup";

// styles
import quoteProfileStyles from "../styles/posts/QuotesProfile.module.css";
import cardStyles from "../styles/components/Cards.module.css";

//helpers and types
import { Tapprovals } from "../fragments/buttons/post-reactions";

export type TsingleStory = {
   ID: string;
   USER_ID: string;
   body: string;
   category_tags: string;
   author: string;
   background: string;
   created_date: string;
   posted_on: string;
   total_count: number;
   creator: {
      ID: string;
      avatar: string;
      signature: string;
      authority_level: string | number;
      approval_rating: string | number;
   };
   comments: {
      total_count: number;
   }[];
   approvals: Tapprovals[];
};

type quoteProfileProps = {
   story: TsingleStory;
   deleteOption: boolean;
   editOption: boolean;
   reportOption: boolean;
};
const QuotesProfile = ({ story, deleteOption, editOption, reportOption }: quoteProfileProps) => {
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

   //    ==================   FUNCTION 3: Delete Popup for quote    =============  //
   const [reportPopUp, setReportPopUp] = useState<boolean>(false);
   const handleReportConfirmation = () => {
      setReportPopUp(true);
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
         {reportPopUp && (
            <ConfirmationPopup
               cancel={() => setReportPopUp(false)}
               title={"Are you sure you want to report this quote?"}
            />
         )}
         <div className={`${quoteProfileStyles.mainWrapper}`}>
            <h3 className={quoteProfileStyles.title}>{story.creator.signature}</h3>
            <div className={quoteProfileStyles.content} id={story.background}>
               {story.body}
            </div>
            <section className={quoteProfileStyles.actionsWrapper}>
               <span
                  className={`std-vector-icon ${quoteProfileStyles.more}`}
                  onClick={handleMoreClick}></span>
               <span
                  className={`std-vector-icon ${quoteProfileStyles.delete}`}
                  onClick={handleDeleteQuote}></span>
               <span className={`std-vector-icon ${quoteProfileStyles.edit}`}></span>
               <span
                  className={(cardStyles.cardIcon, cardStyles.report)}
                  onClick={handleReportConfirmation}></span>
            </section>
         </div>
      </>
   );
};

export default QuotesProfile;

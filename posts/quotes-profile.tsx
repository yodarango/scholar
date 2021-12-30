// core
import React, { useState } from "react";

// graphQl
import client from "../apollo-client";
import { DELETE_ONE_QUOTE } from "../graphql/posts/quotes";

// components
import QuoteViewProfile from "./quotes-view-profile";
import ConfirmationPopup from "../fragments/confirmation-popup";
import NotificationPopup from "../fragments/notification-popup";

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
   // ------------------------ DELETE, REPORT, EDIT STORY ----------------------- //
   const [confirmationPopUpState, setConfirmationPopUpState] = useState<boolean | JSX.Element>(
      false
   );
   const [deletedPostState, setdeletedPostState] = useState<boolean>(false);
   const [notificatonPopUpState, setNotificatonPopUpState] = useState<JSX.Element | boolean>(false);
   //    ==================   FUNCTION 3: Delete Popup for quote    =============  //
   const handlePostDeletion = async (id: string) => {
      const data = await client.mutate({
         mutation: DELETE_ONE_QUOTE,
         variables: { ID: id }
      });
      if (data.data.delete_one_quote) {
         setdeletedPostState(true);
         setConfirmationPopUpState(false);
      } else {
         setNotificatonPopUpState(
            <NotificationPopup
               title='Oh no!'
               contentString='Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!'
               closeModal={() => setNotificatonPopUpState(false)}
            />
         );
      }
   };
   const handleDeleteConfirmation = (id: string) => {
      setConfirmationPopUpState(
         <ConfirmationPopup
            cancel={() => setConfirmationPopUpState(false)}
            title={"Are you sure you want to delete this quote?"}
            confirm={() => handlePostDeletion(id)}
         />
      );
   };

   //    ==================   FUNCTION 3: Report Popup for quote    =============  //
   const handleReportConfirmation = (id: string) => {
      setConfirmationPopUpState(
         <ConfirmationPopup
            cancel={() => setConfirmationPopUpState(false)}
            title={"Are you sure you want to report this quote?"}
            confirm={() => handlePostDeletion(id)}
         />
      );
   };

   return (
      <>
         {morePopUpState && (
            <QuoteViewProfile story={story} handleCloseStories={handleCloseStories} />
         )}
         {confirmationPopUpState}
         {notificatonPopUpState}
         {!deletedPostState && (
            <div className={`${quoteProfileStyles.mainWrapper}`}>
               <h3 className={quoteProfileStyles.title}>{story.creator.signature}</h3>
               <div className={quoteProfileStyles.content} id={story.background}>
                  {story.body}
               </div>
               <section className={quoteProfileStyles.actionsWrapper}>
                  <span
                     className={`std-vector-icon ${quoteProfileStyles.more}`}
                     onClick={handleMoreClick}></span>
                  {deleteOption && (
                     <span
                        className={`std-vector-icon ${quoteProfileStyles.delete}`}
                        onClick={() => handleDeleteConfirmation(story.ID)}></span>
                  )}
                  {editOption && (
                     <span className={`std-vector-icon ${quoteProfileStyles.edit}`}></span>
                  )}
                  {reportOption && (
                     <span
                        className={(cardStyles.cardIcon, cardStyles.report)}
                        onClick={() => handleReportConfirmation(story.ID)}></span>
                  )}
               </section>
            </div>
         )}
      </>
   );
};

export default QuotesProfile;

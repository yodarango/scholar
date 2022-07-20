// core
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

// graphQl
import client from "../apollo-client";
import { DELETE_ONE_QUOTE, REPORT_QUOTE } from "../graphql/posts/quotes";

// components
import QuoteViewProfile from "./quotes-view-profile";
import ConfirmationPopup from "../fragments/confirmation-popup";
import NotificationPopup from "../fragments/popups/notification";

// styles
import quoteProfileStyles from "../styles/posts/QuotesProfile.module.css";
import cardStyles from "../styles/components/Cards.module.css";

//helpers and types
import { Tapprovals } from "../fragments/buttons/post-reactions";
import { loggedInUser } from "../helpers/auth/get-loggedin-user";

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
   user_authority_level: number;
   story: TsingleStory;
};
const QuotesProfile = ({ story, user_authority_level }: quoteProfileProps) => {
   // router
   const router = useRouter();
   // ================= FUNCTION 0: Check if there is a logged in user to render edit and delete buttons
   const [renderDeleteEditOptionsState, setRenderDeleteEditOptionsState] = useState<boolean>(false);
   const [renderReportOptionState, setRenderReportOptionState] = useState<boolean>(false);

   useEffect(() => {
      const authJWT = loggedInUser();
      if (authJWT) {
         setRenderDeleteEditOptionsState(story.USER_ID == authJWT.ID);
         setRenderReportOptionState(story.USER_ID != authJWT.ID);
      }
   }, []);

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
   const [confirmationPopUpState, setConfirmationPopUpState] =
      useState<boolean | JSX.Element>(false);
   const [deletedPostState, setdeletedPostState] = useState<boolean>(false);
   const [notificatonPopUpState, setNotificatonPopUpState] = useState<JSX.Element | boolean>(false);
   //    ==================   FUNCTION 3: Delete Popup for quote    =============  //
   const handlePostDeletion = async (id: string) => {
      try {
         const data = await client.mutate({
            mutation: DELETE_ONE_QUOTE,
            variables: { ID: id }
         });

         if (data.data.delete_one_quote) {
            setdeletedPostState(true);
            setConfirmationPopUpState(false);
         } else {
            setConfirmationPopUpState(false);
            setNotificatonPopUpState(
               <NotificationPopup
                  title='Oh no!'
                  contentString='Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!'
                  closeModal={() => setNotificatonPopUpState(false)}
                  newClass='notification-wrapper--Error'
               />
            );
         }
      } catch (error) {
         console.log(error);
         setConfirmationPopUpState(false);
         setNotificatonPopUpState(
            <NotificationPopup
               title='Oh no!'
               contentString='Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!'
               closeModal={() => setNotificatonPopUpState(false)}
               newClass='notification-wrapper--Error'
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
   const handleReportPost = async (id: string) => {
      try {
         const data = await client.mutate({
            mutation: REPORT_QUOTE,
            variables: {
               QUOTE_ID: id
            }
         });

         if (data.data.report_quote) {
            setConfirmationPopUpState(false);
            setNotificatonPopUpState(
               <NotificationPopup
                  closeModal={() => setNotificatonPopUpState(false)}
                  title='Report Has Been Submitted'
                  contentString='We are reviewing your report and will follow the proper procedures 👮‍♂️'
                  newClass='notification-wrapper--Sucess'
               />
            );
         } else {
            setConfirmationPopUpState(false);
            setNotificatonPopUpState(
               <NotificationPopup
                  closeModal={() => setNotificatonPopUpState(false)}
                  title='Oh no!'
                  contentString='Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!'
                  newClass='notification-wrapper--Error'
               />
            );
         }
      } catch (error) {
         console.log(error);
         setConfirmationPopUpState(false);
         setNotificatonPopUpState(
            <NotificationPopup
               closeModal={() => setNotificatonPopUpState(false)}
               title='Oh no!'
               contentString='Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!'
               newClass='notification-wrapper--Error'
            />
         );
      }
   };

   // ============== FUNCTION 15: report quote confirmation popup
   const handleReportConfirmation = (id: string) => {
      setConfirmationPopUpState(
         <ConfirmationPopup
            cancel={() => setConfirmationPopUpState(false)}
            title={"Are you sure you want to report this quote?"}
            confirm={() => handleReportPost(id)}
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
                  <p>{story.body}</p>
               </div>
               <section className={quoteProfileStyles.actionsWrapper}>
                  <span
                     className={`std-vector-icon ${quoteProfileStyles.more}`}
                     onClick={handleMoreClick}></span>
                  {renderDeleteEditOptionsState && (
                     <span
                        className={`std-vector-icon ${quoteProfileStyles.delete}`}
                        onClick={() => handleDeleteConfirmation(story.ID)}></span>
                  )}
                  {renderDeleteEditOptionsState && (
                     <Link href={`/posts/quote/edit/${story.ID}`}>
                        <a className={`std-vector-icon ${quoteProfileStyles.edit}`}></a>
                     </Link>
                  )}
                  {renderReportOptionState && (
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

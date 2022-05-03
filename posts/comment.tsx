// core
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

//graphQL
import client from "../apollo-client";
import {
   SHOW_COMMENTS_OF_COMMENTARY,
   DELETE_ONE_COMMENTARY,
   REPORT_COMMENTARY
} from "../graphql/posts/commentaries";
import { GET_COMMENTARY_APPROVALS } from "../graphql/posts/approvals";

// components
import CommentaryContent from "../fragments/popup-content/commentary-content";
import PostReactions from "../fragments/buttons/post-reactions";
import ConfirmationPopup from "../fragments/confirmation-popup";
import ContentApprovalDropdown from "../fragments/chunks/content-approval-dropdown";
import NotificationPopup from "../fragments/notification-popup";
import QuickUserInfoPopup from "../fragments/squares/quick-user-info-popup";

// styles
import cardStyles from "../styles/components/Cards.module.css";
import popupStyles from "../styles/layouts/PopupWrapper.module.css";

//helpres
import handlePostComment from "../functions/posts/post-commentary-comment";
import getCookie from "../helpers/get-cookie";
import parseJwt from "../helpers/auth/decodeJWT";

// types
import { Tapprovals } from "../fragments/buttons/post-reactions";
import { IvaluesCat, valuesCat } from "../helpers/dropdown-values";

export type Tcommentary = {
   ID: string;
   USER_ID: string;
   VERSE_ID: string;
   body: string;
   category_tags: string;
   referenced_verses: string;
   created_date: string;
   commented_on: string;
   verse_citation: string;
   total_count: number;
   creator: {
      ID: string;
      signature: string;
      authority_level: string;
      approval_rating: string | number;
      first_name?: string;
      last_name?: string;
      my_church?: string;
      avatar: string;
   };
   comments: {
      total_count: number;
   }[];
   approvals: Tapprovals[];
};

type commentsProps = {
   commentary: Tcommentary;
};

export default function Comments({ commentary }: commentsProps) {
   // ================= FUNCTION 0: Check if there is a logged in user to render edit and delete buttons
   const [renderDeleteEditOptionsState, setRenderDeleteEditOptionsState] = useState<boolean>(false);
   const [renderReportOptionState, setRenderReportOptionState] = useState<boolean>(false);

   useEffect(() => {
      const authCookie = getCookie("authorization");
      if (authCookie) {
         const user = parseJwt(authCookie);
         setRenderDeleteEditOptionsState(commentary.USER_ID == user.ID);
         setRenderReportOptionState(commentary.USER_ID != user.ID);
      }
   }, []);

   // ================= FUNCTION 1: See the whole post
   const [seeWholePost, setseeWholePost] = useState<JSX.Element | boolean>(false);
   const openPost = async (commentary_id: string) => {
      try {
         const { data } = await client.query({
            query: SHOW_COMMENTS_OF_COMMENTARY,
            variables: { ID: commentary_id, showComment: true }
         });
         if(data.commentary){
            setseeWholePost(
               <div className='dark-bkg'>
                  <div className='closeModal' onClick={() => setseeWholePost(false)}>
                     X
                  </div>
                  <div className={popupStyles.halvesWrapper}>
                     <CommentaryContent
                        commentary={commentary}
                        postReactionContent={data.commentary[0]}
                     />
                     {/* <CommentsOfCcommentsContent comments={data.commentary[0].comments} /> */}
                  </div>
               </div>
            );
         } else {
            setNotificationPopUpState(
               <NotificationPopup
                  closeModal={() => setNotificationPopUpState(false)}
                  title='Oh no!'
                  contentString='Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!'
                  newClass='notification-wrapper--Error'
               />
            );
         }
         
      } catch (error) {
         setNotificationPopUpState(
            <NotificationPopup
               closeModal={() => setNotificationPopUpState(false)}
               title='Oh no!'
               contentString='Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!'
               newClass='notification-wrapper--Error'
            />
         );
         console.log(error)
      }  
   };

   // ================= FUNCTION 2: Drop down the comment input   =============== //
   const [commentBoxState, setCommentBoxState] = useState<string>("");
   const openComment = (id: string) => {
      setCommentBoxState(id);
   };
   // ================= FUNCTION 3: Hide the Drop down the comment input  ===================//
   const closeComment = () => {
      setCommentBoxState("");
   };

   // =================    FUNCTION 4: handle the approve click  ================== //
   const [chooseAprovalRating, setChooseAprovalRating] = useState<boolean>(false);
   const handleApproveContent = () => {
      setChooseAprovalRating(true);
   };

   // ------------------- DELETE, REATE, AND EDIT ------------------------- //
   const [confirmationPopUpState, setConfirmationPopUpState] = useState<boolean | JSX.Element>(
      false
   );
   const [notificationPopUpState, setNotificationPopUpState] = useState<boolean | JSX.Element>(
      false
   );
   // ================= FUNCTION 6: Handle deleting the post  ===================//
   const [deletedPostState, setDeletedPostState] = useState(false);
   const handleDeletePost = async (id: string) => {
      try {
         const data = await client.mutate({
            mutation: DELETE_ONE_COMMENTARY,
            variables: { ID: id }
         });
         if (data.data.delete_one_commentary) {
            setDeletedPostState(true);
            setConfirmationPopUpState(false);
         } else {
            setNotificationPopUpState(
               <NotificationPopup
                  closeModal={() => setNotificationPopUpState(false)}
                  title='Oh no!'
                  contentString='Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!'
                  newClass='notification-wrapper--Error'
               />
            );
         }
      } catch (error) {
         console.log(error)
         setNotificationPopUpState(
            <NotificationPopup
               closeModal={() => setNotificationPopUpState(false)}
               title='Oh no!'
               contentString='Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!'
               newClass='notification-wrapper--Error'
            />
         );
      }
     
   };

   const handleDeleteConfirmation = (id: string) => {
      setConfirmationPopUpState(
         <ConfirmationPopup
            cancel={() => setConfirmationPopUpState(false)}
            title={"Are you sure you want to delete this post?"}
            confirm={() => handleDeletePost(id)}
         />
      );
   };

   // ================= FUNCTION 7: Handle Reporting the Post  ===================//
   const handleReportPost = async (id: string) => {
      try {
         const data = await client.mutate({
            mutation: REPORT_COMMENTARY,
            variables: {
               COMMENTARY_ID: id
            }
         });
   
         if (data.data.report_commentary) {
            setConfirmationPopUpState(false);
            setNotificationPopUpState(
               <NotificationPopup
                  closeModal={() => setNotificationPopUpState(false)}
                  title='Report Has Been Submitted'
                  contentString='We are reviewing your report and will follow the proper procedures 👮‍♂️'
                  newClass='notification-wrapper--Sucess'
               />
            );
         } else {
            setConfirmationPopUpState(false);
            setNotificationPopUpState(
               <NotificationPopup
                  closeModal={() => setNotificationPopUpState(false)}
                  title='Oh no!'
                  contentString='Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!'
                  newClass='notification-wrapper--Error'
               />
            );
         }
      } catch (error) {
         console.log(error)
         setConfirmationPopUpState(false);
         setNotificationPopUpState(
            <NotificationPopup
               closeModal={() => setNotificationPopUpState(false)}
               title='Oh no!'
               contentString='Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!'
               newClass='notification-wrapper--Error'
            />
         );
      }
      
   };

   const handleReportConfirmation = (id: string) => {
      setConfirmationPopUpState(
         <ConfirmationPopup
            cancel={() => setConfirmationPopUpState(false)}
            title={"Are you sure you want to report this post?"}
            confirm={() => handleReportPost(id)}
         />
      );
   };

   // ========================= FUNCTION 8: post the comment of the commentary ============================ //
   const commentBody = useRef<HTMLTextAreaElement>(null);
   const [postingState, setPostingState] = useState<boolean>(false);
   const [commentsCountState, setCommentsCountState] = useState<number>(
      commentary.comments[0].total_count
   );

   const postCommentaryComment = async () => {
      if (commentBody.current && commentBody.current.value.length > 0) {
         setPostingState(true);
         const data: any = await handlePostComment(
            commentary.ID,
            commentBody.current.value,
            commentary.creator.ID
         );

         if (data.ID) {
            setCommentsCountState(commentsCountState + 1);
            setPostingState(false);
            setCommentBoxState("");
         } else if (data === "ExceedsPostCount") {
            setPostingState(false);
            setNotificationPopUpState(
               <NotificationPopup
                  closeModal={() => setNotificationPopUpState(false)}
                  title='This is sad 😔'
                  contentString='You have exceeded the post comments whithin a 24-hour period'
                  newClass='notification-wrapper--Error'
               />
            );
            return;
         } else if (data === "Error") {
            setPostingState(false);
            setNotificationPopUpState(
               <NotificationPopup
                  closeModal={() => setNotificationPopUpState(false)}
                  title='Oh no!'
                  contentString='Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!'
                  newClass='notification-wrapper--Error'
               />
            );

            return;
         } else {
            setPostingState(false);
            setNotificationPopUpState(
               <NotificationPopup
                  closeModal={() => setNotificationPopUpState(false)}
                  title={`You're not authorized! 👮‍♂️`}
                  contentString={
                     data.graphQLErrors
                        ? data.graphQLErrors[0]?.message
                        : "Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!"
                  }
                  newClass='notification-wrapper--Error'
               />
            );

            return;
         }
      }
   };

   // ======================== FUNCTION 9: hande a ssuccessful approval rating ========================= //
   const [postApprovalState, setPostApprovalState] = useState<Tapprovals>(commentary.approvals[0]);
   const handleSuccessfulApprovalRating = async () => {

      try {
         const { data } = await client.query({
            query: GET_COMMENTARY_APPROVALS,
            variables: {
               COMMENTARY_ID: commentary.ID
            }
         });
         setChooseAprovalRating(false);
         setPostApprovalState(data.commentary_approvals[0]);
      } catch (error) {
         console.log(error);
         setNotificationPopUpState(
            <NotificationPopup
            closeModal={() => setNotificationPopUpState(false)}
            title='Oh no!'
            contentString='Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!'
            newClass='notification-wrapper--Error'
         />
         );
      } 
   };

   // ================== FUNCTION 10: open the user info popup
   const [userQuickAccessInfoPopup, setUserQuickAccessInfoPopup] = useState<boolean | JSX.Element>(
      false
   );

   const handleQuickInfoAccessPopup = (user: any) => {
      setUserQuickAccessInfoPopup(
         <QuickUserInfoPopup user={user} closeModal={() => setUserQuickAccessInfoPopup(false)} />
      );
   };

   // ================ FUNCTION 11:  open categroy popup on category tag click  ================ ///
   const [tagInfoPopupState, setTagInfoPopupState] = useState<boolean | JSX.Element>(false);
   const openInfoAboutTagColor = (cat: string) => {
      const selectedTag = valuesCat.filter((obj: IvaluesCat) => obj.tag === cat);

      setTagInfoPopupState(
         <NotificationPopup
            title={selectedTag[0].title}
            closeModal={() => setTagInfoPopupState(false)}
            contentArray={selectedTag[0].subjects}
            newClass={`notification-wrapper--${selectedTag[0].title}`}
         />
      );
   };
   return (
      <>
         {chooseAprovalRating && (
            <ContentApprovalDropdown
               handleCloseApprovalDropdown={() => setChooseAprovalRating(false)}
               post_id={{ comment: commentary.ID }}
               user_id={commentary.creator.ID}
               successfulApproval={handleSuccessfulApprovalRating}
            />
         )}
         {tagInfoPopupState}
         {userQuickAccessInfoPopup}
         {confirmationPopUpState}
         {notificationPopUpState}
         {seeWholePost}
         {!deletedPostState && (
            <div
               className={`${cardStyles.commentCard}`}
               key={commentary.ID}
               id={`${commentary.ID}`}>
               <div className={cardStyles.commentCardHeader}>
                  <span
                     className={cardStyles.categoryTagPointer}
                     onClick={() => openInfoAboutTagColor(commentary.category_tags.split(" ")[0])}
                     id={`category-${commentary.category_tags
                        .split(" ")[0]
                        .replace("#", "")}`}></span>
                  {commentary.creator && commentary.creator.authority_level && (
                     <div className={cardStyles.creatorimMainWrapper}>
                        <div
                           className={`${cardStyles.commentCardHeaderAvatarImgBkg} ${
                              commentary.creator.authority_level == "trusted"
                                 ? cardStyles.commentCardHeaderAvatarImgBkgTrusted
                                 : ""
                           }`}
                           onClick={() => handleQuickInfoAccessPopup(commentary.creator)}>
                           <img
                              src={commentary.creator.avatar}
                              alt='Avatar'
                              className={`${cardStyles.commentCardHeaderAvatarImg}`}
                           />
                        </div>
                        {commentary.creator.authority_level == "trusted" && (
                           <span className={cardStyles.trustedPointer}></span>
                        )}
                     </div>
                  )}
                  {commentary.creator && <h1>{commentary.creator.signature}</h1>}
                  {renderDeleteEditOptionsState && (
                     <span
                        className={(cardStyles.cardIcon, cardStyles.delete)}
                        onClick={() => handleDeleteConfirmation(commentary.ID)}></span>
                  )}
                  {renderDeleteEditOptionsState && (
                     <Link href={`/posts/edit-commentary/${commentary.ID}`}>
                        <a className={(cardStyles.cardIcon, cardStyles.edit)}></a>
                     </Link>
                  )}
                  {renderReportOptionState && (
                     <span
                        className={(cardStyles.cardIcon, cardStyles.report)}
                        onClick={() => handleReportConfirmation(commentary.ID)}></span>
                  )}
               </div>
               <i>{`comment on ${commentary.verse_citation}`}</i>
               <p>{commentary.body}</p>
               {
                  <PostReactions
                     handleComment={() => openComment(commentary.ID)}
                     handleRateContent={handleApproveContent}
                     handleMore={() => openPost(commentary.ID)}
                     comments={commentsCountState}
                     approvals={postApprovalState}
                  />
               }
               {commentBoxState === commentary.ID && (
                  <div
                     id={`comment-${commentary.ID}`}
                     className={`${cardStyles.stdInputCommentWrapper}`}>
                     <textarea
                        maxLength={150}
                        placeholder='Comment...'
                        className={`std-input ${cardStyles.stdInputComment}`}
                        ref={commentBody}></textarea>
                     <div className={`${cardStyles.postCancelWrapper}`}>
                        {!postingState && (
                           <span
                              className={`std-button_gradient-text`}
                              onClick={postCommentaryComment}>
                              Post
                           </span>
                        )}
                        {postingState && (
                           <span className={`std-button_gradient-text`}>Posting...</span>
                        )}
                        <span onClick={closeComment}>Cancel</span>
                     </div>
                  </div>
               )}
            </div>
         )}
      </>
   );
}

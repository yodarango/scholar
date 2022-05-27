// core
import { useState, useRef, useEffect } from "react";
import router from "next/router";
import Link from "next/link";

// graphql
import client from "../apollo-client";
import {
   REPORT_THOUGHT,
   SHOW_COMMENTS_OF_THOUGHTS,
   DELETE_ONE_THOUGHT
} from "../graphql/posts/thoughts";
//import { GET_THOUGHT_APPROVALS } from "../graphql/posts/approvals";

// components
import ThoughtContent from "../fragments/popup-content/thought-content";
import PostReactions from "../fragments/buttons/post-reactions";
import ContentApprovalDropdown from "../fragments/chunks/content-approval-dropdown";
import NotificationPopup from "../fragments/notification-popup";
import QuickUserInfoPopup from "../fragments/squares/quick-user-info-popup";

// styles
import cardStyles from "../styles/components/Cards.module.css";
import popupStyles from "../styles/layouts/PopupWrapper.module.css";
import ConfirmationPopup from "../fragments/confirmation-popup";

// helpers / types
import { Tapprovals } from "../fragments/buttons/post-reactions";
import handlePostComment from "../functions/posts/post-thought-comment";
import { loggedInUser } from "../helpers/auth/get-loggedin-user";

export type Tthought = {
   ID: string;
   USER_ID: string;
   title: string;
   body: string;
   category_tags: string;
   referenced_verses: string;
   created_date: string;
   posted_on: string;
   total_count: number;
   creator: {
      ID: string;
      signature: string;
      authority_level: number;
      approval_rating: string;
      avatar: string;
   };
   comments: {
      total_count: number;
   }[];
   approvals: Tapprovals[];
};

type thoughtProps = {
   user_authority_level?: number;
   thoughts: Tthought[];
};

const Thought = ({ thoughts, user_authority_level }: thoughtProps) => {
   // ================= FUNCTION 0: Check if there is a logged in user to render edit and delete buttons
   const [renderAdminOptionsState, setRenderAdminOptionsState] = useState<string>("");

   useEffect(() => {
      const authJWT = loggedInUser();
      if (authJWT) {
         setRenderAdminOptionsState(authJWT.ID);
      }
   }, []);

   // ================= FUNCTION 1: See the whole post  ================= //
   const [seeWholePost, setseeWholePost] = useState<JSX.Element | boolean>(false);

   const openPost = async (thought: Tthought) => {
      try {
         const { data } = await client.query({
            query: SHOW_COMMENTS_OF_THOUGHTS,
            variables: { ID: thought.ID, showComment: true }
         });
         setseeWholePost(
            <div className='dark-bkg'>
               <div className='closeModal' onClick={() => setseeWholePost(false)}>
                  X
               </div>
               <div className={popupStyles.halvesWrapper}>
                  <ThoughtContent thought={thought} postReactionContent={data.thought[0]} />
                  {/*data.thought[0].comments &&  <CommentsOfThoughtsContent comments={data.thought[0].comments} />*/}
               </div>
            </div>
         );
      } catch (error) {
         setNotificationpopUpState(
            <NotificationPopup
               title='Oh no!'
               contentString='Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!'
               closeModal={() => setNotificationpopUpState(false)}
               newClass='notification-wrapper--Red'
            />
         );
         console.log(error);
      }
   };

   // ================= FUNCTION 2: Drop down the comment imput   =============== //
   const [commentBoxState, setCommentBoxState] = useState<string>("");
   const openComment = (id: string) => {
      setCommentBoxState(id);
   };

   // ================= FUNCTION 3: Hide the Drop down the comment imput  ===================//
   const closeComment = () => {
      setCommentBoxState("");
   };

   // =================    FUNCTION 4: handle the approve click  ================== //
   const [chooseAprovalRating, setChooseAprovalRating] = useState<boolean | JSX.Element>(false);
   const handleApproveContent = (thought_id: any, creator_id: any) => {
      setChooseAprovalRating(
         <ContentApprovalDropdown
            handleCloseApprovalDropdown={() => setChooseAprovalRating(false)}
            post_id={{ thought: thought_id }}
            user_id={creator_id}
            successfulApproval={() => handleSuccessfulApprovalRating(thought_id)}
         />
      );
   };
   // ======================== FUNCTION 5: hande a ssuccessful approval rating ========================= //
   //const [approvalsCountState, setApprovalsCountState] = useState<number>(0);
   const handleSuccessfulApprovalRating = async (thought_id: string) => {
      // currently not refetching approvals since thought.tx needs to be moved to its own comp
      // const { data } = await client.query({
      //    query: GET_THOUGHT_APPROVALS,
      //    variables: {
      //       THOUGHT_ID: thought_id
      //    }
      // });
      //setApprovalsCountState((approvalsCountState) => approvalsCountState + 1);
      setChooseAprovalRating(false);
   };
   // ------------------------- REPORT, DELETE, EDIT OPTIONS ------------------ //
   const [confirmationPopUpState, setConfirmationPopUpState] = useState<boolean | JSX.Element>(
      false
   );
   const [notificationpopUpState, setNotificationpopUpState] = useState<JSX.Element | boolean>(
      false
   );
   // ================= FUNCTION 6: Delete Post  ===================//
   const handleDeletePost = async (id: string) => {
      try {
         const data = await client.mutate({
            mutation: DELETE_ONE_THOUGHT,
            variables: { ID: id }
         });
         if (data.data.delete_one_thought) {
            router.reload();
         } else {
            setNotificationpopUpState(
               <NotificationPopup
                  title='Oh no!'
                  contentString='Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!'
                  closeModal={() => setNotificationpopUpState(false)}
                  newClass='notification-wrapper--Red'
               />
            );
            setConfirmationPopUpState(false);
         }
      } catch (error) {
         console.log(error);
         setNotificationpopUpState(
            <NotificationPopup
               title='Oh no!'
               contentString='Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!'
               closeModal={() => setNotificationpopUpState(false)}
               newClass='notification-wrapper--Red'
            />
         );
         setConfirmationPopUpState(false);
      }
   };
   const handleDeletePostConfirmation = (id: string) => {
      setConfirmationPopUpState(
         <ConfirmationPopup
            cancel={() => setConfirmationPopUpState(false)}
            title={"Are you sure you want to delete this thought?"}
            confirm={() => handleDeletePost(id)}
         />
      );
   };

   // ================= FUNCTION 7: Handle the report post  ===================//
   const handleReportPost = async (id: string) => {
      try {
         const { data } = await client.mutate({
            mutation: REPORT_THOUGHT,
            variables: {
               THOUGHT_ID: id,
               USER_ID: 1
            }
         });

         if (data.report_thought) {
            setConfirmationPopUpState(false);
            setNotificationpopUpState(
               <NotificationPopup
                  closeModal={() => setNotificationpopUpState(false)}
                  title='Report Has Been Submitted'
                  contentString='We are reviewing your report and will follow the proper procedures 👮‍♂️'
                  newClass='notification-wrapper--Sucess'
               />
            );
         } else if (data && !data.data.report_thought) {
            setConfirmationPopUpState(false);
            setNotificationpopUpState(
               <NotificationPopup
                  closeModal={() => setNotificationpopUpState(false)}
                  title='Oh no!'
                  contentString='Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!'
                  newClass='notification-wrapper--Error'
               />
            );
         }
      } catch (error: any) {
         setConfirmationPopUpState(false);
         setNotificationpopUpState(
            <NotificationPopup
               closeModal={() => setNotificationpopUpState(false)}
               title={`You're not authorized! 👮‍♂️`}
               contentString={error.graphQLErrors[0]?.message} //'Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!'
               newClass='notification-wrapper--Error'
            />
         );
      }
   };

   // ======================= FUNCTION 8: Delete the post ============================= //
   const handleReportPostCnofirmtation = (id: string) => {
      setConfirmationPopUpState(
         <ConfirmationPopup
            cancel={() => setConfirmationPopUpState(false)}
            title={"Are you sure you want to report this thought?"}
            confirm={() => handleReportPost(id)}
         />
      );
   };

   // ============================= FUNCTION 9: post the comment ============================================== //
   const commentBody = useRef<HTMLTextAreaElement>(null);
   const [postingState, setPostingState] = useState<boolean>(false);
   const [commentsCountState, setCommentsCountState] = useState<number>(0);

   const postCommentaryComment = async (thought_id: string, user_id: string) => {
      if (commentBody.current && commentBody.current.value.length > 0) {
         setPostingState(true);
         const data: any = await handlePostComment(thought_id, commentBody.current.value, user_id);

         if (data.ID) {
            setPostingState(false);
            setCommentBoxState("");
            //commentBody.current.value = "comment posted";
            setCommentsCountState(commentsCountState + 1);
            return;
         } else if (data === "ExceedsPostCount") {
            setPostingState(false);
            setNotificationpopUpState(
               <NotificationPopup
                  closeModal={() => setNotificationpopUpState(false)}
                  title='This is sad 😔'
                  contentString='You have exceeded the post comment count whithin a 24-hour period'
                  newClass='notification-wrapper--Error'
               />
            );

            return;
         } else if (data === "Error") {
            setPostingState(false);
            setNotificationpopUpState(
               <NotificationPopup
                  closeModal={() => setNotificationpopUpState(false)}
                  title='Oh no!'
                  contentString='Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!'
                  newClass='notification-wrapper--Error'
               />
            );

            return;
         } else {
            setPostingState(false);
            setNotificationpopUpState(
               <NotificationPopup
                  closeModal={() => setNotificationpopUpState(false)}
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

   // open the user info popup
   const [userQuickAccessInfoPopup, setUserQuickAccessInfoPopup] = useState<boolean | JSX.Element>(
      false
   );

   const handleQuickInfoAccessPopup = (user: any) => {
      setUserQuickAccessInfoPopup(
         <QuickUserInfoPopup user={user} closeModal={() => setUserQuickAccessInfoPopup(false)} />
      );
   };
   return (
      <>
         {seeWholePost}
         {userQuickAccessInfoPopup}
         {confirmationPopUpState}
         {notificationpopUpState}
         {chooseAprovalRating}
         {thoughts.map((thought, index) => {
            thought.creator.authority_level == user_authority_level ? user_authority_level : 0;
            return (
               <div className={`${cardStyles.commentCard}`} key={thought.ID} id={`${thought.ID}`}>
                  <div
                     className={cardStyles.commentCardHeader}
                     id={`category-${thought.category_tags.split(" ")[0].replace("#", "")}`}>
                     {thought.creator && thought.creator.authority_level != undefined && (
                        <div className={cardStyles.creatorimMainWrapper}>
                           <div
                              className={`${cardStyles.commentCardHeaderAvatarImgBkg} ${
                                 thought.creator.authority_level == 2
                                    ? cardStyles.commentCardHeaderAvatarImgBkgTrusted
                                    : ""
                              }`}
                              onClick={() => handleQuickInfoAccessPopup(thought.creator)}>
                              <img
                                 src={thought.creator.avatar}
                                 alt='Avatar'
                                 className={`${cardStyles.commentCardHeaderAvatarImg}`}
                              />
                           </div>
                           {thought.creator.authority_level == 2 && (
                              <span className={cardStyles.trustedPointer}></span>
                           )}
                        </div>
                     )}
                     {thought.creator && thought.creator.signature && (
                        <h1 className={cardStyles.userSignature}>{thought.creator.signature}</h1>
                     )}
                     {thought.creator && renderAdminOptionsState == thought.creator.ID && (
                        <span
                           className={(cardStyles.cardIcon, cardStyles.delete)}
                           onClick={() => handleDeletePostConfirmation(thought.ID)}></span>
                     )}
                     {thought.creator && renderAdminOptionsState == thought.creator.ID && (
                        <Link href={`/posts/thought/edit/${thought.ID}`}>
                           <a className={(cardStyles.cardIcon, cardStyles.edit)}></a>
                        </Link>
                     )}
                     {thought.creator &&
                        renderAdminOptionsState != thought.creator.ID &&
                        renderAdminOptionsState != "" && (
                           <span
                              id={renderAdminOptionsState}
                              className={(cardStyles.cardIcon, cardStyles.report)}
                              onClick={() => handleReportPostCnofirmtation(thought.ID)}></span>
                        )}
                  </div>
                  {thought.creator && thought.creator.signature && (
                     <i>{`${thought.creator.signature} expressed a new Tought`}</i>
                  )}
                  <p className={`std-text-block--widget ${cardStyles.postTime}`}>
                     {thought.posted_on}
                  </p>
                  <p className={cardStyles.thoughtBody}>{thought.body}</p>
                  <PostReactions
                     handleComment={() => openComment(thought.ID)}
                     handleRateContent={() => handleApproveContent(thought.ID, thought.creator.ID)}
                     handleMore={() => openPost(thought)}
                     comments={thought.comments[0].total_count + commentsCountState}
                     approvals={thought.approvals ? thought.approvals[0] : null}
                  />
                  {commentBoxState === thought.ID && (
                     <div
                        id={`comment-${thought.ID}`}
                        className={`${cardStyles.stdInputCommentWrapper}`}>
                        <textarea
                           maxLength={150}
                           placeholder='Comment...'
                           ref={commentBody}
                           className={`std-input ${cardStyles.stdInputComment}`}></textarea>
                        <div className={`${cardStyles.postCancelWrapper}`}>
                           {!postingState && (
                              <span
                                 className={`std-button_gradient-text`}
                                 onClick={() =>
                                    postCommentaryComment(thought.ID, thought.creator.ID)
                                 }>
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
            );
         })}
      </>
   );
};

export default Thought;

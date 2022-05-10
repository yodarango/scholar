// core
import { useState, useRef, useEffect } from "react";

// graphQL
import client from "../apollo-client";
import { GET_QUOTE_APPROVALS } from "../graphql/posts/approvals";
import { OPEN_QUOTE_STORY, OPEN_QUOTE_STORY_COMMENTS } from "../graphql/posts/quotes";

// components
import PostReactions from "../fragments/buttons/post-reactions";
import CommentsOfQuote from "../fragments/popup-content/comments-of-quote";
import ConfirmationPopup from "../fragments/confirmation-popup";
import ContentApprovalDropdown from "../fragments/chunks/content-approval-dropdown";
import NotificationPopup from "../fragments/notification-popup";
import QuickUserInfoPopup from "../fragments/squares/quick-user-info-popup";

// styles
import quoteStoriesStyles from "../styles/posts/QuotesStories.module.css";
import cardStyles from "../styles/components/Cards.module.css";
import contentApprovalDDStyles from "../styles/fragments/chunks/ContentApprovalDorpdown.module.css";

// helpers
import handlePostComment from "../functions/posts/post-quote-comment";
import getCookie from "../helpers/get-cookie";
import parseJwt from "../helpers/auth/decodeJWT";

//types
import { Tapprovals, Tcomment } from "../fragments/buttons/post-reactions";
import { IvaluesCat, valuesCat } from "../helpers/dropdown-values";

export type Tstory = {
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

export type quoteStoriesProps = {
   stories: Tstory[];
   deleteOption?: boolean;
   editOption?: boolean;
   reportOption?: boolean;
};

export type last24SingleQuote = {
   ID: string;
   approvals: {
      ID: string;
      USER_ID: string;
      QUOTE_ID: string;
      posted_on: string;
      total_count: number;
      average_count: number;
   }[];
   creator: {
      ID: string;
      avatar: string;
      signature: string;
      approval_rating: string;
      authority_level: number;
   };
};

const QuoteStories = ({ ID, creator, approvals }: last24SingleQuote) => {
   // globals
   const [notificationPopUpState, setNotificationPopUpState] = useState<boolean | JSX.Element>(
      false
   );

   // ================= FUNCTION 0: Check if there is a logged in user to render edit and delete buttons
   const [renderDeleteEditOptionsState, setRenderDeleteEditOptionsState] = useState<boolean>(false);
   const [renderReportOptionState, setRenderReportOptionState] = useState<boolean>(false);

   useEffect(() => {
      const authCookie = getCookie("authorization");
      if (authCookie) {
         const user = parseJwt(authCookie);
         setRenderDeleteEditOptionsState(creator.ID == user.ID);
         setRenderReportOptionState(creator.ID != user.ID);
      }
   }, []);

   // ==============   FUNCTION 1: Open the stories of Each user   =============== //
   const [handleStoriePopupState, setHandleStoriePopupState] = useState<boolean>(false);
   const [quoteState, setQuoteState] = useState<Tstory[]>([]);

   const [countState, setCountState] = useState<number>(0);
   const handleOpenStroies = async (user_id: string) => {
      const { data } = await client.query({
         query: OPEN_QUOTE_STORY,
         variables: { USER_ID: user_id, last_id: null }
      });

      setQuoteState(data.quote);
      document.body.style.overflow = "hidden";
      setHandleStoriePopupState(true);
      setCommentsCountState(data.quote[countState].comments[0].total_count);
   };

   // ==============   FUNCTION 2: Go backwards in the story   =============== //
   const handleMoveBack = () => {
      if (countState > 0) setCountState(countState - 1);
   };

   // ==============   FUNCTION 3: Go forthward in the story   =============== //
   const handleMoveForth = () => {
      if (countState < quoteState.length - 1) setCountState(countState + 1);
   };

   const initialRender = useRef(true);
   useEffect(() => {
      if (initialRender.current) {
         initialRender.current = false;
      } else {
         handleSuccessfulApprovalRating(quoteState[countState].ID);
      }
   }, [countState]);
   // ==============   FUNCTION 4: close all the stories   =============== //
   const handleCloseStories = () => {
      document.body.style.overflow = "scroll";
      setHandleStoriePopupState(false);
      setCountState(0);
      setCommentsOfQuote({ content: [], popUp: false });
      setPostApprovalState(approvals[0]);
   };

   // ==============   FUNCTION 5: commennt on the story  =============== //
   const [commentPopUpState, setCommentPopUpState] = useState<boolean>(false);
   const handleCommentClick = () => {
      setCommentPopUpState(true);
   };

   // ==============   FUNCTION 8: see the stroy data when the user clicks "More" =============== //
   const [commentsOfQuote, setCommentsOfQuote] = useState<{ content: Tcomment[]; popUp: boolean }>({
      popUp: false,
      content: []
   });

   // ============ FUNCTION 8.1: update the approvals for each story on toggling.
   //              idealy the way stories are rendered shall change in the future.
   const handleMoreClick = async (quote_id: string) => {
      const { data } = await client.query({
         query: OPEN_QUOTE_STORY_COMMENTS,
         variables: { ID: quote_id, showComment: true }
      });
      setCommentsOfQuote({ popUp: true, content: data.quote[0].comments });
   };

   // ==============   FUNCTION 9: see the story data when the user clicks "More" =============== //
   const handleCloseComment = () => {
      setCommentPopUpState(false);
   };

   // ================= FUNCTION 10: Handle the delete popup  ===================//
   const [deletePopupState, setDeletePopupState] = useState<boolean>(false);
   const handleDeleteConfirmation = () => {
      setDeletePopupState(true);
   };

   // ================= FUNCTION 11: Handle the report story popup  ===================//
   const [reportPopupState, setReportPopupState] = useState<boolean>(false);
   const handleReportConfirmation = () => {
      setReportPopupState(true);
   };

   // ========================= FUNCTION 12: post the comment of the commentary ============================ //
   const commentBody = useRef<HTMLTextAreaElement>(null);
   const [postingState, setPostingState] = useState<boolean>(false);
   const [commentsCountState, setCommentsCountState] = useState<number>(0);
   const postQuoteComment = async (storyId: string) => {
      if (commentBody.current && commentBody.current.value.length > 0) {
         setPostingState(true);

         try {
            const data: any = await handlePostComment(
               storyId,
               commentBody.current.value,
               creator.ID
            );
            if (data == "Quote_Comment") {
               setCommentsCountState(commentsCountState + 1);
               setPostingState(false);
               setCommentPopUpState(false);
               return;
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
         } catch (error) {
            console.log(error);
         }
      }
   };

   // ================= FUNCTION 13: handle the approve click  ================== //
   const [chooseAprovalRating, setChooseAprovalRating] = useState<boolean>(false);
   const handleApproveContent = () => {
      setChooseAprovalRating(true);
   };
   // ======================== FUNCTION 13.1: hande a ssuccessful approval rating ========================= //
   const [postApprovalState, setPostApprovalState] = useState<Tapprovals>(approvals[0]);
   const handleSuccessfulApprovalRating = async (id?: string) => {
      const { data } = await client.query({
         query: GET_QUOTE_APPROVALS,
         variables: {
            QUOTE_ID: id ? id : quoteState[countState].ID
         }
      });
      console.log(data);
      setChooseAprovalRating(false);
      setPostApprovalState(data.quote_approvals[0]);
   };

   // ================ FUNCTION 14:  open categroy popup on category tag click  ================ ///
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

   // ================== FUNCTION 15: open the user info popup
   const [userQuickAccessInfoPopup, setUserQuickAccessInfoPopup] = useState<boolean | JSX.Element>(
      false
   );

   const handleQuickInfoAccessPopup = (user: any) => {
      setUserQuickAccessInfoPopup(
         <QuickUserInfoPopup
            user={user}
            closeModal={() => setUserQuickAccessInfoPopup(false)}
            additionalStyles={{ zIndex: 20 }}
         />
      );
   };

   return (
      <div className={quoteStoriesStyles.mainWrapper}>
         {deletePopupState}
         {notificationPopUpState}
         {tagInfoPopupState}
         {userQuickAccessInfoPopup}
         {reportPopupState && (
            <ConfirmationPopup
               title={`Are you sure you want to report this story`}
               cancel={() => setReportPopupState(false)}
            />
         )}
         {chooseAprovalRating && (
            <ContentApprovalDropdown
               handleCloseApprovalDropdown={() => setChooseAprovalRating(false)}
               additionalClassOne={contentApprovalDDStyles.mianWrapper_quotes}
               additionalClassTwo={contentApprovalDDStyles.listWrapper_quotes}
               additionalClassThree={contentApprovalDDStyles.listWrapper_list_quotes}
               post_id={{ quote: quoteState[countState].ID }}
               user_id={creator.ID}
               successfulApproval={handleSuccessfulApprovalRating}
            />
         )}

         {/* ------------- avatars for all the current users with stories within the last 24 hours ---------------- */}
         <section
            className={quoteStoriesStyles.mainStoryWrapper}
            onClick={() => handleOpenStroies(creator.ID)}>
            <div
               className={`${quoteStoriesStyles.userReputationWrapper} ${
                  creator.authority_level == 2
                     ? quoteStoriesStyles.userReputationWrapperTrusted
                     : ""
               }`}>
               <div
                  className={quoteStoriesStyles.avatarImage}
                  style={{ backgroundImage: `url(${creator.avatar})` }}></div>
            </div>
            {creator.authority_level == 2 && (
               <span className={quoteStoriesStyles.trustedPointer}></span>
            )}
            <p className={quoteStoriesStyles.userSignature}>{creator.signature}</p>
         </section>

         {/* ---------------- Wrapper of the open stories ---------------*/}
         {handleStoriePopupState && (
            <section className={quoteStoriesStyles.storyPostWrapper}>
               <div
                  className={quoteStoriesStyles.wholeAvatarWrapperView}
                  onClick={() => handleQuickInfoAccessPopup(creator)}>
                  {/* <a href={`/users/${creator.ID}`}> */}
                  <div
                     className={`${quoteStoriesStyles.userReputationWrapperView} ${
                        creator.authority_level == 2
                           ? quoteStoriesStyles.userReputationWrapperViewTrusted
                           : ""
                     }`}>
                     <div
                        className={quoteStoriesStyles.avatarImageStoryView}
                        style={{ backgroundImage: `url(${creator.avatar})` }}></div>
                  </div>
                  {creator.authority_level == 2 && (
                     <span className={quoteStoriesStyles.trustedPointerView}></span>
                  )}
                  {/* </a> */}
               </div>

               <div className={quoteStoriesStyles.count}>
                  {countState + 1} of {quoteState.length}
               </div>
               <div
                  className={`closeModal ${quoteStoriesStyles.closeModal}`}
                  onClick={handleCloseStories}>
                  X
               </div>

               {/* ---------------------------- toggle buttons --------------------------- */}
               <div className={quoteStoriesStyles.storyPostsControllerWrapper}>
                  <span
                     className={quoteStoriesStyles.postStoryLeft}
                     onClick={() => {
                        handleMoveBack();
                     }}></span>
                  <span
                     className={quoteStoriesStyles.postStoryRight}
                     onClick={() => {
                        handleMoveForth();
                     }}></span>
               </div>

               <div
                  className={`${quoteStoriesStyles.storyPost}`}
                  id={quoteState[countState].background}>
                  <p className={`${quoteStoriesStyles.storyContent}`}>
                     {quoteState[countState].body}{" "}
                     <span className={quoteStoriesStyles.quotationMark}></span>
                  </p>

                  {/* ------------------------ author and admin features ------------------------ */}
                  <span className={quoteStoriesStyles.storyBy}>
                     -By: {quoteState[countState].author}
                     {renderDeleteEditOptionsState && (
                        <span
                           className={(cardStyles.cardIcon, cardStyles.delete)}
                           onClick={handleDeleteConfirmation}></span>
                     )}
                     {renderDeleteEditOptionsState && (
                        <span className={(cardStyles.cardIcon, cardStyles.edit)}></span>
                     )}
                     {renderReportOptionState && (
                        <span
                           className={(cardStyles.cardIcon, cardStyles.report)}
                           onClick={handleReportConfirmation}></span>
                     )}
                  </span>
               </div>

               {/* ------------------- post comment, rate, more ---------------------- */}
               <div className={quoteStoriesStyles.postReactionWrapper}>
                  <PostReactions
                     handleRateContent={handleApproveContent}
                     handleComment={handleCommentClick}
                     handleMore={() => handleMoreClick(quoteState[countState].ID)}
                     approvals={postApprovalState}
                     comments={commentsCountState}
                  />
               </div>

               {/* --------------- comment popup -------------------- */}
               {commentPopUpState && (
                  <div className={quoteStoriesStyles.commentWrapper}>
                     <h3>Type your comment</h3>
                     <textarea placeholder={"comment..."} ref={commentBody}></textarea>
                     <div className={quoteStoriesStyles.postReactionWrapperComment}>
                        {!postingState && (
                           <span
                              className={"std-button_gradient-text"}
                              onClick={() => postQuoteComment(quoteState[countState].ID)}>
                              Post
                           </span>
                        )}
                        {postingState && (
                           <span className={"std-button_gradient-text"}>Posting...</span>
                        )}
                        <span
                           className={quoteStoriesStyles.cancelButton}
                           onClick={handleCloseComment}>
                           Cancel
                        </span>
                     </div>
                  </div>
               )}

               {/* --------------------- map through the comments if the story does have comments  --------------------- */}
               {commentsOfQuote.popUp && commentsOfQuote.content.length > 0 && (
                  <section className={quoteStoriesStyles.commentsOfStroyWrapper}>
                     <span
                        className={quoteStoriesStyles.closeCommentsCarrousel}
                        onClick={() => setCommentsOfQuote({ popUp: false, content: [] })}>
                        X
                     </span>
                     <CommentsOfQuote comments={commentsOfQuote.content} />
                  </section>
               )}

               {/* ---------------- render if that specific story has no comments --------------------- */}
               {commentsOfQuote.popUp && commentsOfQuote.content.length === 0 && (
                  <section className={quoteStoriesStyles.commentsOfStroyWrapper}>
                     <span
                        className={quoteStoriesStyles.closeCommentsCarrousel}
                        onClick={() => setCommentsOfQuote({ popUp: false, content: [] })}>
                        X
                     </span>
                     <h3 className={quoteStoriesStyles.noCommentsYet}>
                        Be the first one to comment! 😊
                     </h3>
                  </section>
               )}
               <div
                  className={quoteStoriesStyles.selectedTagColor}
                  onClick={() =>
                     openInfoAboutTagColor(quoteState[countState].category_tags.split(" ")[0])
                  }
                  id={`category-${quoteState[countState].category_tags
                     .split(" ")[0]
                     .replace("#", "")}`}></div>
            </section>
         )}
      </div>
   );
};

export default QuoteStories;

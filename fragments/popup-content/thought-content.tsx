// core
import { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";

// graphQL
import client from "../../apollo-client";
import { GET_THOUGHT_COMMENTS } from "../../graphql/posts/comments";

// components
import NotificationPopup from "../notification-popup";
import CommentsOfThoughtContent from "./comments-of-thoughts";
import handlePostComment from "../../functions/posts/post-thought-comment";
import ContentApprovalDropdown from "../chunks/content-approval-dropdown";

// styles
import textEditorStyles from "../../styles/layouts/textEditor.module.css";
import popupStyles from "../../styles/layouts/PopupWrapper.module.css";

// helpers
import PostReactions, { Tapprovals, Tcomment } from "../buttons/post-reactions";
import { Tthought } from "../../posts/thought";
import { GET_THOUGHT_APPROVALS } from "../../graphql/posts/approvals";
import { chosenKey } from "../../helpers/APIs/select-random-api-key";

// others

type thoughtContentProps = {
   thought: Tthought;
   postReactionContent: {
      approvals: Tapprovals;
      comments: Tcomment[];
   };
};
const ThoughtContent = ({ thought, postReactionContent }: thoughtContentProps) => {
   const [notificationpopUpState, setNotificationpopUpState] = useState<JSX.Element | boolean>(
      false
   );

   // open the referenced scriptures on a popup
   const [referencedVerseState, setreferencedVerseState] = useState<JSX.Element | boolean>(false);
   const [showRefVersesState, setShowRefVersesState] = useState<boolean>(true);

   const openReferencedVerse = async (id: string) => {
      setShowRefVersesState(false);
      try {
         const req = await fetch(
            `https://api.scripture.api.bible/v1/bibles/c315fa9f71d4af3a-01/verses/${id}?content-type=text&include-verse-numbers=false`,
            {
               method: "GET",
               headers: {
                  "api-key": `${chosenKey}`
               }
            }
         );
         const json = await req.json();
         setreferencedVerseState(
            <NotificationPopup
               title={json.data.reference}
               contentString={json.data.content}
               closeModal={() => {
                  setreferencedVerseState(false);
               }}
            />
         );
         setShowRefVersesState(true);
      } catch (error) {
         console.log(error);
         setShowRefVersesState(true);
         setNotificationpopUpState(
            <NotificationPopup
               closeModal={() => setNotificationpopUpState(false)}
               title='Oh no!'
               contentString='Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!'
               newClass='notification-wrapper--Error'
            />
         );
      }
   };

   // =================    FUNCTION 1: handle the approve click  ================== //
   const [chooseAprovalRating, setChooseAprovalRating] = useState<boolean>(false);
   const handleApproveContent = () => {
      setChooseAprovalRating(true);
   };

   // ======================== FUNCTION 1.1: hande a ssuccessful approval rating ========================= //
   const [postApprovalState, setPostApprovalState] = useState<Tapprovals>(thought.approvals[0]);
   const handleSuccessfulApprovalRating = async () => {
      try {
         const { data } = await client.query({
            query: GET_THOUGHT_APPROVALS,
            variables: {
               THOUGHT_ID: thought.ID
            }
         });
         setChooseAprovalRating(false);
         setPostApprovalState(data.thought_rating[0]);
      } catch (error) {
         console.log(error);
         setChooseAprovalRating(false);
      }
   };

   // ========= FUNCTION: open and close the comment text area
   type IopenCommentInputState = {
      status: boolean;
      func: React.MouseEventHandler;
   };

   const openCommentArea = () => {
      setOpenCommentInputState({ status: true, func: closeCommentArea });
   };
   const closeCommentArea = () => {
      setOpenCommentInputState({ status: false, func: openCommentArea });
   };
   const [openCommentInputState, setOpenCommentInputState] = useState<IopenCommentInputState>({
      status: false,
      func: openCommentArea
   });

   // ========================= FUNCTION 3: post the comment of the commentary ============================ //
   const commentBody = useRef<HTMLTextAreaElement>(null);
   const [postingState, setPostingState] = useState<boolean>(false);
   const [commentsCountState, setCommentsCountState] = useState<number>(
      postReactionContent.comments.length
   );
   const [commentaryCommentsState, setCommentaryCommentsState] = useState(
      postReactionContent.comments
   );

   const postThoughtComment = async () => {
      if (commentBody.current && commentBody.current.value.length > 0) {
         setPostingState(true);
         const data: any = await handlePostComment(
            thought.ID,
            commentBody.current.value,
            thought.creator.ID
         );
         if (data.ID) {
            setCommentsCountState(commentsCountState + 1);
            setPostingState(false);
            setOpenCommentInputState({ status: false, func: openCommentArea });
            fetchComments(data);
            return;
         } else if (data === "ExceedsPostCount") {
            setPostingState(false);
            setNotificationpopUpState(
               <NotificationPopup
                  closeModal={() => setNotificationpopUpState(false)}
                  title='This is sad 😔'
                  contentString='You have exceeded the post comments whithin a 24-hour period'
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

   // ========================= FUNSTION 4: get an updated array of comments after the post is made ============ //
   //--- send the notification to the child component "comments of content" to include the new posted comment
   const [fetchNewCommentsState, setFetchNewCommentsState] = useState<number>(0);
   const fetchComments = async (data: Tcomment) => {
      const newCommentary: Tcomment = {
         ID: data.ID,
         body: data.body,
         creator_avatar: data.creator_avatar,
         creator_signature: data.creator_signature,
         creator_approval_rate: data.creator_approval_rate,
         creator_authority_level: data.creator_authority_level,
         creator_id: data.creator_id
      };

      setCommentaryCommentsState((commentaryCommentsState) => [
         newCommentary,
         ...commentaryCommentsState
      ]);
      setFetchNewCommentsState(fetchNewCommentsState + 1);
   };

   // ============= FUNCTION 5:  Update the commentary count once a comment is deleted
   const updateCommentaryCount = () => {
      setCommentsCountState(commentsCountState - 1);
   };

   return (
      <>
         {chooseAprovalRating && (
            <ContentApprovalDropdown
               handleCloseApprovalDropdown={() => setChooseAprovalRating(false)}
               post_id={{ thought: thought.ID }}
               user_id={thought.creator.ID}
               successfulApproval={handleSuccessfulApprovalRating}
            />
         )}
         {notificationpopUpState}
         {referencedVerseState}
         <div className={`${popupStyles.halfWidth}`}>
            <div className={popupStyles.halfWidthRight}>
               <h1 className={`${popupStyles.stdSmallTitle}`}>{thought.title}</h1>
               <ReactMarkdown className={popupStyles.commentaryBodyContent}>
                  {thought.body}
               </ReactMarkdown>

               {/* Comment text area */}
               {openCommentInputState.status === true && (
                  <div id={popupStyles.stdTextAreaWrapper}>
                     <textarea
                        maxLength={150}
                        id={popupStyles.stdTextArea}
                        placeholder='Comment...'
                        className={`std-text-area`}
                        ref={commentBody}></textarea>
                     {!postingState && (
                        <div
                           id={popupStyles.stdButton}
                           className={`std-button`}
                           onClick={postThoughtComment}>
                           <p id={popupStyles.gradientText} className='std-button_gradient-text'>
                              Post
                           </p>
                        </div>
                     )}
                     {postingState && (
                        <div id={popupStyles.stdButton} className={`std-button`}>
                           <p id={popupStyles.gradientText} className='std-button_gradient-text'>
                              Posting...
                           </p>
                        </div>
                     )}
                  </div>
               )}

               {/* Reaction buttons (like comments ) */}
               <PostReactions
                  handleComment={openCommentInputState.func}
                  handleRateContent={handleApproveContent}
                  comments={commentsCountState}
                  approvals={postApprovalState}
               />

               {/* Assigned Tags */}
               <div className={textEditorStyles.textEditorTags}>
                  {thought.category_tags.split(" ")[0] && (
                     <div id={`category-${thought.category_tags.split(" ")[0].replace("#", "")}`}>
                        {thought.category_tags.split(" ")[0]}
                     </div>
                  )}
                  {thought.category_tags.split(" ")[1] && (
                     <div id={`category-${thought.category_tags.split(" ")[1].replace("#", "")}`}>
                        {thought.category_tags.split(" ")[1]}
                     </div>
                  )}
               </div>

               {/* referenced verses */}
               <div
                  className={`${textEditorStyles.textEditorTags} ${textEditorStyles.textEditorTagsSecond}`}>
                  {thought.referenced_verses &&
                     showRefVersesState &&
                     thought.referenced_verses.split(" ").map((verseId: string) => (
                        <div
                           className={textEditorStyles.textEditorVerse}
                           data-verseId-={verseId}
                           onClick={() => openReferencedVerse(verseId)}>
                           {verseId}
                        </div>
                     ))}
               </div>
            </div>
         </div>
         <CommentsOfThoughtContent
            loadedFrom={"thought"}
            comments={commentaryCommentsState}
            fetchNewComment={fetchNewCommentsState}
            updateCommentaryCount={() => updateCommentaryCount()}
         />
      </>
   );
};

export default ThoughtContent;

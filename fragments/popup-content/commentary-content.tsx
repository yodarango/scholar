// core
import { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";

// graphql
import client from "../../apollo-client";
import { GET_COMMENTARY_COMMENTS } from "../../graphql/posts/comments";
import { GET_COMMENTARY_APPROVALS } from "../../graphql/posts/approvals";

// components
import NotificationPopup from "../notification-popup";
import CommentsOfCcommentsContent from "./comments-of-thoughts";
import handlePostComment from "../../functions/posts/post-commentary-comment";
import ContentApprovalDropdown from "../chunks/content-approval-dropdown";

// styles
import textEditorStyles from "../../styles/layouts/textEditor.module.css";
import popupStyles from "../../styles/layouts/PopupWrapper.module.css";

// helpers
import { Tcommentary } from "../../posts/comment";
import PostReactions, { Tapprovals, Tcomment } from "../buttons/post-reactions";

// others

type commentaryContentProps = {
   //commentsArray:;
   commentary: Tcommentary;
   postReactionContent: {
      approvals: Tapprovals[];
      comments: Tcomment[];
   };
};
const CommentaryContent = ({ commentary, postReactionContent }: commentaryContentProps) => {
   // open the referenced scriptures on a popup
   const [referencedVerseState, setreferencedVerseState] = useState<JSX.Element | boolean>(false);

   const openReferencedVerse = async (id: string) => {
      const req = await fetch(
         `https://api.scripture.api.bible/v1/bibles/c315fa9f71d4af3a-01/verses/${id}?content-type=text&include-verse-numbers=false`,
         {
            method: "GET",
            headers: {
               "api-key": `${process.env.NEXT_PUBLIC_BIBLE_API_KEY}`
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
   };

   // ========= FUNCTION 1: open and close the comment text areaa
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

   // =================    FUNCTION 2: handle the approve click  ================== //
   const [chooseAprovalRating, setChooseAprovalRating] = useState<boolean>(false);
   const handleApproveContent = () => {
      setChooseAprovalRating(true);
   };
   // ======================== FUNCTION 2.1: hande a ssuccessful approval rating ========================= //
   const [postApprovalState, setPostApprovalState] = useState<Tapprovals>(commentary.approvals[0]);
   const handleSuccessfulApprovalRating = async () => {
      const { data } = await client.query({
         query: GET_COMMENTARY_APPROVALS,
         variables: {
            COMMENTARY_ID: commentary.ID
         }
      });
      setChooseAprovalRating(false);
      setPostApprovalState(data.commentary_approvals[0]);
   };

   // ========================= FUNCTION 3: post the comment of the commentary ============================ //
   const commentBody = useRef<HTMLTextAreaElement>(null);
   const [postingState, setPostingState] = useState<boolean>(false);
   const [commentsCountState, setCommentsCountState] = useState<number>(
      //commentary.comments[0].total_count
      postReactionContent.comments.length
   );
   const [commentaryCommentsState, setCommentaryCommentsState] = useState(
      postReactionContent.comments
   );

   const [notificationPopUpState, setNotificationPopUpState] = useState<boolean | JSX.Element>(
      false
   );
   const postCommentaryComment = async () => {
      if (commentBody.current && commentBody.current.value.length > 0) {
         setPostingState(true);
         const data: any = await handlePostComment(
            commentary.ID,
            commentBody.current.value,
            commentary.creator.ID
         );

         // if the helper function returns true then everything went well
         if (data.ID) {
            // increase comment count
            setCommentsCountState(commentsCountState + 1);

            // reset the comment textarea state
            setPostingState(false);
            setOpenCommentInputState({ status: false, func: openCommentArea });

            // create the new comment
            fetchComments(data);
         } else if (data == false) {
            setPostingState(false);
            setNotificationPopUpState(
               <NotificationPopup
                  closeModal={() => setNotificationPopUpState(false)}
                  title='Oh no!'
                  contentString='Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!'
                  newClass='notification-wrapper--Error'
               />
            );
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
         }
      }
   };

   // ========================= FUNSTION 4: get an updated array of comments after the post is made ============ //

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
   };

   return (
      <>
         {notificationPopUpState}
         {chooseAprovalRating && (
            <ContentApprovalDropdown
               handleCloseApprovalDropdown={() => setChooseAprovalRating(false)}
               post_id={{ comment: commentary.ID }}
               user_id={commentary.creator.ID}
               successfulApproval={handleSuccessfulApprovalRating}
            />
         )}
         {referencedVerseState}
         <div className={`${popupStyles.halfWidth}`}>
            <div className={popupStyles.halfWidthRight}>
               <h1
                  className={`${popupStyles.stdSmallTitle}`}>{`Comment on ${commentary.verse_citation} by ${commentary.creator.signature}`}</h1>
               <ReactMarkdown className={popupStyles.commentaryBodyContent}>
                  {commentary.body}
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
                           onClick={postCommentaryComment}>
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
                  <div id={`category-${commentary.category_tags.split(" ")[0].replace("#", "")}`}>
                     {commentary.category_tags.split(" ")[0]}
                  </div>
                  {commentary.category_tags.split(" ")[1] && (
                     <div
                        id={`category-${commentary.category_tags.split(" ")[1].replace("#", "")}`}>
                        {commentary.category_tags.split(" ")[1]}
                     </div>
                  )}
               </div>

               {/* referenced verses */}
               <div
                  className={`${textEditorStyles.textEditorTags} ${textEditorStyles.textEditorTagsSecond}`}>
                  {commentary.referenced_verses &&
                     commentary.referenced_verses.split(" ").map((verseId: string) => (
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
         <CommentsOfCcommentsContent comments={commentaryCommentsState} />
      </>
   );
};

export default CommentaryContent;

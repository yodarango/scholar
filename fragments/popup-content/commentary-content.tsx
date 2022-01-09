// core
import { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";

// graphql
import client from "../../apollo-client";
import { GET_COMMENTARY_COMMENTS } from "../../graphql/posts/comments";

// components
import NotificationPopup from "../notification-popup";
import CommentsOfCcommentsContent from "./comments-of-thoughts";

// styles
import textEditorStyles from "../../styles/layouts/textEditor.module.css";
import popupStyles from "../../styles/layouts/PopupWrapper.module.css";

// helpers
import { Tcommentary } from "../../posts/comment";
import PostReactions, { Tapprovals, Tcomment } from "../buttons/post-reactions";
import handlePostComment from "../../functions/posts/post-commentary-comment";

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

   //   =======================  FUNCTION 2: handle rating content ============= //
   const handleRateContent = () => {};

   // ========================= FUNCTION 3: post the comment of the commentary ============================ //
   const commentBody = useRef<HTMLTextAreaElement>(null);
   const [postingState, setPostingState] = useState<boolean>(false);
   const [commentsCountState, setCommentsCountState] = useState<number>(
      commentary.comments[0].total_count
   );
   const [commentaryCommentsState, setCommentaryCommentsState] = useState(
      postReactionContent.comments
   );

   const postCommentaryComment = async () => {
      if (commentBody.current && commentBody.current.value.length > 0) {
         setPostingState(true);
         const data = await handlePostComment(commentary.ID, "2", commentBody.current.value);
         if (data == true) {
            setCommentsCountState(commentsCountState + 1);
            setPostingState(false);
            setOpenCommentInputState({ status: false, func: openCommentArea });
            fetchComments();
         } else {
            setPostingState(true);
         }
      }
   };

   // ========================= FUNSTION 4: get an updated array of comments after the post is made ============ //

   const fetchComments = async () => {
      try {
         const { data } = await client.query({
            query: GET_COMMENTARY_COMMENTS,
            variables: { COMMENTARY_ID: commentary.ID, last_id: 1000 }
         });
         setCommentaryCommentsState(data.commentary_comments);
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <>
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
                  handleRateContent={handleRateContent}
                  comments={commentsCountState}
                  approvals={postReactionContent.approvals}
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

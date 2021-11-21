// core
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

// components
import NotificationPopup from "../notification-popup";

// styles
import textEditorStyles from "../../styles/layouts/textEditor.module.css";
import popupStyles from "../../styles/layouts/PopupWrapper.module.css";

// helpers
import { Tcommentary } from "../../posts/comment";
import PostReactions, { Tapprovals, Tcomment } from "../buttons/post-reactions";

// others

type commentaryContentProps = {
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
      console.log(json.data);
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

   //   ==================  FUNCTION 2: handle rating content ============= //
   const handleRateContent = () => {};

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
                        className={`std-text-area`}></textarea>
                     <div id={popupStyles.stdButton} className={`std-button`}>
                        <p id={popupStyles.gradientText} className='std-button_gradient-text'>
                           Post
                        </p>
                     </div>
                  </div>
               )}

               {/* Reaction buttons (like comments ) */}
               <PostReactions
                  handleComment={openCommentInputState.func}
                  handleRateContent={handleRateContent}
                  comments={postReactionContent.comments.length}
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
      </>
   );
};

export default CommentaryContent;

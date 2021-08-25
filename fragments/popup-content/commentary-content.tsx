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
import PostReactions from "../buttons/post-reactions";

// others

type commentaryContentProps = {
   commentary: Tcommentary;
};
const CommentaryContent = ({ commentary }: commentaryContentProps) => {
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

   //   ==================  FUNCTION 2: handle the like ============= //
   const handleApproveClick = () => {};

   //   ==================  FUNCTION 3: handle the dislike ============= //
   const handledisapproveClick = () => {};
   return (
      <>
         {referencedVerseState}
         <div className={`${popupStyles.halfWidth}`}>
            <div className={popupStyles.halfWidthRight}>
               <h1
                  className={`${popupStyles.stdSmallTitle}`}>{`Comment on ${commentary.commentedOn.verseReferences} by ${commentary.userSignature}`}</h1>
               <ReactMarkdown>{commentary.content}</ReactMarkdown>

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
                  handleApprove={handleApproveClick}
                  handleDisapprove={handledisapproveClick}
               />

               {/* Assigned Tags */}
               <div className={textEditorStyles.textEditorTags}>
                  {commentary.tags && (
                     <div style={{ backgroundColor: commentary.colors[0] }}>
                        {commentary.tags[0]}
                     </div>
                  )}
                  {commentary.tags && (
                     <div
                        style={{
                           backgroundColor: commentary.colors[1]
                        }}>
                        {commentary.tags[1]}
                     </div>
                  )}
               </div>

               {/* referenced verses */}
               <div
                  className={`${textEditorStyles.textEditorTags} ${textEditorStyles.textEditorTagsSecond}`}>
                  {commentary.referencedScriptures &&
                     commentary.referencedScriptures.map(
                        (el: { verseId: string; verseReferences: string }) => (
                           <div
                              className={textEditorStyles.textEditorVerse}
                              data-verseId-={el.verseId}
                              onClick={() => openReferencedVerse(el.verseId)}>
                              {el.verseReferences}
                           </div>
                        )
                     )}
               </div>
            </div>
         </div>
      </>
   );
};

export default CommentaryContent;

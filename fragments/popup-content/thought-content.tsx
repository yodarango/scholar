// core
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

// components
import NotificationPopup from "../notification-popup";

// styles
import textEditorStyles from "../../styles/layouts/textEditor.module.css";
import popupStyles from "../../styles/layouts/PopupWrapper.module.css";

// helpers
import PostReactions, { Tapprovals, Tcomment } from "../buttons/post-reactions";
import { Tthought } from "../../posts/thought";

// others

type thoughtContentProps = {
   thought: Tthought;
   postReactionContent: {
      approvals: Tapprovals;
      comments: {}[];
   };
};
const ThoughtContent = ({ thought, postReactionContent }: thoughtContentProps) => {
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

   //   ==================  FUNCTION 2: hhandle rate the content ============= //
   const handleRateContent = () => {};

   return (
      <>
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
                  approvals={thought.approvals}
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
                     thought.referenced_verses.split(" ").map((verse: string) => (
                        <div
                           className={textEditorStyles.textEditorVerse}
                           data-verseId-={verse}
                           onClick={() => openReferencedVerse(verse)}>
                           {verse}
                        </div>
                     ))}
               </div>
            </div>
         </div>
      </>
   );
};

export default ThoughtContent;

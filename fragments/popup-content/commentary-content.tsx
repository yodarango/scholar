// core
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

// components
import NotificationPopup from "../notification-popup";

// styles
import textEditorStyles from "../../styles/layouts/textEditor.module.css";
import popupStyles from "../../styles/layouts/PopupWrapper.module.css";

// others
import { bibleApi } from "../../env";
//import commentary from "../../pages/new-post/commentary";

type CommentaryContentProps = {
   title: string;
   content: string;
   referencedVerses: object[];
   categories: { first: { color: string; tag: string }; second: { color: string; tag: string } };
};
const CommentaryContent = ({
   title,
   content,
   referencedVerses,
   categories
}: CommentaryContentProps) => {
   // open the referenced scriptures on a popup
   const [referencedVerseState, setreferencedVerseState] = useState<JSX.Element | boolean>(false);

   const openReferencedVerse = async (id: string) => {
      const req = await fetch(
         `https://api.scripture.api.bible/v1/bibles/c315fa9f71d4af3a-01/verses/${id}?content-type=text&include-verse-numbers=false`,
         {
            method: "GET",
            headers: {
               "api-key": `${bibleApi}`
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
   return (
      <>
         {referencedVerseState}
         <div className={`${popupStyles.halfWidth}`}>
            <div className={popupStyles.halfWidthRight}>
               <h1 className={`${popupStyles.stdSmallTitle}`}>{title}</h1>
               <ReactMarkdown>{content}</ReactMarkdown>

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
               <div id={`${popupStyles.cardIconWrapper}`}>
                  <div>
                     <span>232</span>
                     <div
                        id={popupStyles.cardIcon}
                        className={`std-vector-icon ${popupStyles.cardIconComment}`}
                        onClick={openCommentInputState.func}></div>
                  </div>
                  <div>
                     <span>3,232</span>
                     <div
                        id={popupStyles.cardIcon}
                        className={`std-vector-icon ${popupStyles.cardIconLike}`}></div>
                  </div>
               </div>

               {/* Assigned Tags */}
               <div className={textEditorStyles.textEditorTags}>
                  {categories.first.color && (
                     <div style={{ backgroundColor: categories.first.color }}>
                        #{categories.first.tag}
                     </div>
                  )}
                  {categories.second.color && (
                     <div
                        style={{
                           backgroundColor: categories.second.color
                        }}>
                        #{categories.second.tag}
                     </div>
                  )}
               </div>

               {/* referenced verses */}
               <div
                  className={`${textEditorStyles.textEditorTags} ${textEditorStyles.textEditorTagsSecond}`}>
                  {referencedVerses &&
                     referencedVerses.map((el: any) => (
                        <div
                           className={textEditorStyles.textEditorVerse}
                           data-verseId-={el.id}
                           onClick={() => openReferencedVerse(el.id)}>
                           {el.name}
                        </div>
                     ))}
               </div>
            </div>
         </div>
      </>
   );
};

export default CommentaryContent;

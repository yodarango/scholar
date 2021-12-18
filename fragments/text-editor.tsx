// core
import React, { useRef, useState } from "react";

// graohwl
import client from "../apollo-client";
import { CREATE_NEW_COMMENTARY } from "../graphql/posts/commentaries";

// components
import Dropdown from "./buttons/dropdown";
import PopupWrapper from "../layouts/popup-wrapper";
import NotificationPopup from "./notification-popup";
import TextEditorPreview from "./chunks/text-editor-preview";

//styles
import textEditorStyles from "../styles/layouts/textEditor.module.css";

// others
import { /*valuesType,*/ valuesCat } from "../helpers/dropdown-values";
import { TverseContent } from "../pages";

// Component Props
type editorProps = {
   title: string;
   commentary?: string;
   formattingRules?: JSX.Element;
   removeVerse?: any;
   referencedVerses: any;
   verseBeingCommented?: TverseContent;
};

const TextEditor = ({
   verseBeingCommented,
   title,
   commentary,
   formattingRules,
   removeVerse,
   referencedVerses
}: editorProps) => {
   /*==================  FUNCTION: Grow Text Area on Change  ===========*/
   // References to textarea and ReactMarkdown wrappers
   const textArea = useRef<HTMLTextAreaElement>(null);
   const hiddenTextArea = useRef<HTMLDivElement>(null);

   type IHiddenTextArea = {
      footer: string;
      textarea: string;
      preview: JSX.Element | boolean;
   };

   const [textAreaValue, setTextAreaValue] = useState<string>("");
   const growTextArea = () => {
      if (textArea && textArea.current) {
         let currSscrollHeight = textArea.current.scrollHeight;
         textArea.current.style.height = `${currSscrollHeight}px`;
      }
   };

   const [hiddenTextAreaState, setHiddenTextArea] = useState<IHiddenTextArea>({
      footer: "none",
      textarea: "",
      preview: false
   });
   const showHiddenArea = () => {
      setHiddenTextArea({
         textarea: "block",
         footer: `${textEditorStyles.textEditorFooterActivated}`,
         preview: (
            <PopupWrapper
               content={
                  <TextEditorPreview
                     tagsAssigned={
                        <div
                           className={`${textEditorStyles.textEditorTags} ${textEditorStyles.textEditorTagsFirst}`}>
                           Categories:
                           <div style={{ backgroundColor: addedFirstTagsState.color }}>
                              {addedFirstTagsState.tag}
                           </div>
                           <div style={{ backgroundColor: addedSecondTagsState.color }}>
                              {addedSecondTagsState.tag}
                           </div>
                        </div>
                     }
                     referencedVerses={referencedVerses}
                     content={textArea.current ? textArea.current.value : ""}
                  />
               }
               closeModal={closeModals}
            />
         )
      });
   };

   if (hiddenTextArea.current) {
      hiddenTextArea.current.style.display = `${hiddenTextAreaState.textarea}`;
   }
   /*==================  FUNCTION: Close All Open Modals  ===========*/
   const closeModals = () => {
      setHiddenTextArea({
         textarea: "none",
         footer: " ",
         preview: false
      });
      //setEditorInstructionsState(false);
      setCategoryInfoState(false);
   };

   /*==================  FUNCTION: open category popup info  ===========*/
   const [categoryInfoState, setCategoryInfoState] = useState<JSX.Element | boolean>(false);
   const openCategoryInfo = (subjects: [], key: string) => {
      setCategoryInfoState(
         <NotificationPopup
            title={"Categories"}
            contentArray={subjects}
            closeModal={closeModals}
            newClass={`notification-wrapper--${key}`}
         />
      );
   };

   /*==================  FUNCTION: Add Category Tags ===========*/
   type IaddedTagState = {
      tag?: string | undefined;
      color?: string | undefined;
   };

   const [addedFirstTagsState, setAddedFirstTagsState] = useState<IaddedTagState>({
      tag: undefined,
      color: undefined
   });
   const [addedSecondTagsState, setAddedSecondTagsState] = useState<IaddedTagState>({
      tag: undefined,
      color: undefined
   });

   const addTag = (el: any) => {
      addedFirstTagsState.color == undefined
         ? setAddedFirstTagsState({ tag: el.tag, color: el.color })
         : setAddedSecondTagsState({ tag: el.tag, color: el.color });
   };

   const removeFirstTag = () => {
      setAddedFirstTagsState({ tag: undefined, color: undefined });
   };
   const removeSecondTag = () => {
      setAddedSecondTagsState({ tag: undefined, color: undefined });
   };

   // ================= Post the commentary ===================== //
   const handlePostCommentary = async () => {
      await client.mutate({
         mutation: CREATE_NEW_COMMENTARY,
         variables: {
            USER_ID: 2,
            VERSE_ID: verseBeingCommented ? verseBeingCommented.id : null,
            body: textArea.current ? textArea.current.value : null,
            category_tags: `${addedFirstTagsState.tag} ${addedSecondTagsState.tag}`,
            referenced_verses:
               referencedVerses.length > 0
                  ? `${referencedVerses.map((verse: any) => verse.id + " ")}`
                  : null,
            verse_citation: verseBeingCommented ? verseBeingCommented.reference : null
         }
      });
   };

   /*=========================== return JSX Element =========================================*/
   return (
      <div className={textEditorStyles.wrapper}>
         {hiddenTextAreaState.preview}
         {categoryInfoState}

         {/*===  title  ======*/}
         <div className={textEditorStyles.titleWrapper}>
            <h2 className={`std-text-block--small-title ${textEditorStyles.title}`}>{title}</h2>
         </div>
         {/*===  Dropdown  ======*/}
         <div>
            <Dropdown
               //initialValueType={commentary}
               initialValueCat={`Category`}
               //valuesType={valuesType}
               valuesCat={valuesCat}
               openCategoryInfo={openCategoryInfo}
               addTag={addTag}
            />

            {/*===  Textarea  ======*/}
            <div className={textEditorStyles.textAreasWrapper}>
               {formattingRules}
               <textarea
                  className={`std-text-area ${textEditorStyles.textArea}`}
                  ref={textArea}
                  onChange={() => {
                     growTextArea();
                  }}></textarea>

               {/*===  Tags Wrapper  ======*/}
               <div className={textEditorStyles.textEditorTags}>
                  {addedFirstTagsState.color && (
                     <div style={{ backgroundColor: addedFirstTagsState.color }}>
                        #{addedFirstTagsState.tag}
                        <span
                           onClick={removeFirstTag}
                           className={textEditorStyles.textEditorTagsClose}>
                           X
                        </span>
                     </div>
                  )}
                  {addedSecondTagsState.color && (
                     <div
                        style={{
                           backgroundColor: addedSecondTagsState.color
                        }}>
                        #{addedSecondTagsState.tag}
                        <span
                           onClick={removeSecondTag}
                           className={textEditorStyles.textEditorTagsClose}>
                           X
                        </span>
                     </div>
                  )}
               </div>

               {/*====  Referenced Verses Wrapper ======*/}
               <div className={textEditorStyles.textEditorTags}>
                  {referencedVerses &&
                     referencedVerses.map((el: any) => (
                        <div className={textEditorStyles.textEditorVerse} data-verseId-={el.id}>
                           {el.name}
                           <span
                              className={textEditorStyles.textEditorTagsClose}
                              id={textEditorStyles.textEditorTagsClose}
                              onClick={() => removeVerse(el.id)}>
                              X
                           </span>
                        </div>
                     ))}
               </div>

               {/*===  Footer  ======*/}
               <div
                  className={`${textEditorStyles.textEditorFooter} ${hiddenTextAreaState.footer}`}
                  onClick={showHiddenArea}>
                  <div className={`std-vector-icon ${textEditorStyles.textEditorSeeSource}`}></div>
               </div>
            </div>
         </div>
         {/*===  Post Button  ======*/}
         <div className='std-button'>
            <div className='std-button_gradient-text' onClick={handlePostCommentary}>
               Post
            </div>
         </div>
      </div>
   );
};

export default TextEditor;

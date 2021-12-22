// core
import React, { useRef, useState } from "react";
import { useRouter } from "next/router";

// graohwl
import client from "../apollo-client";
import { CREATE_NEW_COMMENTARY } from "../graphql/posts/commentaries";
import { CREATE_NEW_THOUGHT } from "../graphql/posts/thoughts";

// components
import Dropdown from "./buttons/dropdown";
import PopupWrapper from "../layouts/popup-wrapper";
import NotificationPopup from "./notification-popup";
import TextEditorPreview from "./chunks/text-editor-preview";
import SmallLoader from "./chunks/small-loader";

//styles
import textEditorStyles from "../styles/layouts/textEditor.module.css";

// others
import { valuesCat } from "../helpers/dropdown-values";
import { TverseContent } from "../pages";

// Component Props
type editorProps = {
   title: string;
   commentary?: string;
   formattingRules?: JSX.Element;
   removeVerse?: any;
   referencedVerses: any;
   verseBeingCommented?: TverseContent;
   contentTypeToPost: string;
};

const TextEditor = ({
   verseBeingCommented,
   title,
   formattingRules,
   removeVerse,
   referencedVerses,
   contentTypeToPost
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

   //const [textAreaValue, setTextAreaValue] = useState<string>("");
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
      setNotificationPopupState(false);
   };

   /*==================  FUNCTION: open category popup info  ===========*/
   const [notificationPopupState, setNotificationPopupState] = useState<JSX.Element | boolean>(
      false
   );
   const openCategoryInfo = (subjects: [], key: string) => {
      setNotificationPopupState(
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

   // ================= FUNCTION: Post the commentary ===================== //
   // this function will only be called if hte "contentToPost" is COMMENTARY
   const [loadingState, setLoadingState] = useState<boolean | JSX.Element>(false);
   const router = useRouter();
   const handlePostCommentary = async () => {
      if (
         textArea.current &&
         textArea.current.value.length !== 0 &&
         addedFirstTagsState.tag !== undefined &&
         verseBeingCommented?.id
      ) {
         setLoadingState(<SmallLoader />);
         const { data } = await client.mutate({
            mutation: CREATE_NEW_COMMENTARY,
            variables: {
               USER_ID: 2,
               VERSE_ID: verseBeingCommented.id,
               body: textArea.current?.value,
               category_tags: `${addedFirstTagsState.tag} ${addedSecondTagsState.tag}`,
               referenced_verses:
                  referencedVerses.length > 0
                     ? `${referencedVerses.map((verse: any) => verse.id + " ")}`
                     : null,
               verse_citation: verseBeingCommented?.reference,
               approval_level: "general"
            }
         });
         data.commentary
            ? router.reload()
            : setLoadingState(<p className='std-error-msg'>Sorry, something went wrong 🙁!</p>);
      } else if (textArea.current && textArea.current.value.length === 0) {
         setNotificationPopupState(
            <NotificationPopup
               title={"Empty Field Detected"}
               contentString={"Commentary text is required"}
               closeModal={closeModals}
               newClass={`notification-wrapper--Red`}
            />
         );
      } else if (!addedFirstTagsState.tag) {
         setNotificationPopupState(
            <NotificationPopup
               title={"No Tag Detected"}
               contentString={"At least one category tag is required"}
               closeModal={closeModals}
               newClass={`notification-wrapper--Red`}
            />
         );
      } else if (verseBeingCommented?.id === undefined || verseBeingCommented?.id === "") {
         setNotificationPopupState(
            <NotificationPopup
               title={"No Verse Selected"}
               contentString={"Please select a verse to comment on"}
               closeModal={closeModals}
               newClass={`notification-wrapper--Red`}
            />
         );
      }
   };

   // ================= FUNCTION: Post the commentary ===================== //
   // this function will only be called if hte "contentToPost" is THOUGHT
   const handlePostThought = async () => {
      if (
         textArea.current &&
         textArea.current.value.length !== 0 &&
         addedFirstTagsState.tag !== undefined
      ) {
         setLoadingState(<SmallLoader />);
         const { data } = await client.mutate({
            mutation: CREATE_NEW_THOUGHT,
            variables: {
               USER_ID: 2,
               body: textArea.current?.value,
               title: "...",
               category_tags: `${addedFirstTagsState.tag} ${addedSecondTagsState.tag}`,
               referenced_verses:
                  referencedVerses.length > 0
                     ? `${referencedVerses.map((verse: any) => verse.id + " ")}`
                     : null,
               approval_level: "general"
            }
         });
         data.thought
            ? router.reload()
            : setLoadingState(<p className='std-error-msg'>Sorry, something went wrong 🙁!</p>);
      } else if (textArea.current && textArea.current.value.length === 0) {
         setNotificationPopupState(
            <NotificationPopup
               title={"Empty Field Detected"}
               contentString={"Commentary text is required"}
               closeModal={closeModals}
               newClass={`notification-wrapper--Red`}
            />
         );
      } else if (!addedFirstTagsState.tag) {
         setNotificationPopupState(
            <NotificationPopup
               title={"No Tag Detected"}
               contentString={"At least one category tag is required"}
               closeModal={closeModals}
               newClass={`notification-wrapper--Red`}
            />
         );
      }
   };

   /*=========================== return JSX Element =========================================*/
   return (
      <div className={textEditorStyles.wrapper}>
         {hiddenTextAreaState.preview}
         {notificationPopupState}
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
                  maxLength={999}
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
         {/*===  Post Button if Content type is commentar\y ======*/}
         {!loadingState && contentTypeToPost == "COMMENTARY" && (
            <div className='std-button'>
               <div className='std-button_gradient-text' onClick={handlePostCommentary}>
                  Post
               </div>
            </div>
         )}
         {/*===  Post Button if Content type is thought\y ======*/}
         {!loadingState && contentTypeToPost == "THOUGHT" && (
            <div className='std-button'>
               <div className='std-button_gradient-text' onClick={handlePostThought}>
                  Post
               </div>
            </div>
         )}
         {loadingState}
      </div>
   );
};

export default TextEditor;

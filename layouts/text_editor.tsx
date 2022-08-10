// core
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";

// graohwl
import client from "../apollo-client";
import { CREATE_NEW_COMMENTARY, EDIT_COMMENTARY } from "../graphql/posts/commentaries";
import { CREATE_NEW_THOUGHT, EDIT_THOUGHT } from "../graphql/posts/thoughts";

// components
import Dropdown from "../fragments/buttons/dropdown";
import PopupWrapper from "./popup-wrapper";
import NotificationPopup from "../fragments/popups/notification";
import TextEditorPreview from "../fragments/chunks/text-editor-preview";
import SmallLoader from "../fragments/chunks/small_loader";

//styles
import textEditorStyles from "../styles/layouts/textEditor.module.css";

// helpers / types
import { valuesCat } from "../data/category_meta";
import { TverseContent } from "../pages";

// Component Props
type editorProps = {
   title: string;
   // commentary?: string;
   formattingRules?: JSX.Element;
   removeVerse?: any;
   referencedVerses?: any;
   assignedTags?: {
      first?: string;
      second?: string;
   };
   verseBeingCommented?: TverseContent;
   contentTypeToPost: string;
   currentText?: string;
   postId?: string;
};

const TextEditor = ({
   verseBeingCommented,
   title,
   formattingRules,
   removeVerse,
   referencedVerses,
   contentTypeToPost,
   currentText,
   assignedTags,
   postId
}: editorProps) => {
   // ---------- states
   const [isPrivatePost, setIsPrivatePost] = useState(false);
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
                           <div id={`category-${addedFirstTagsState.color}`}>
                              {addedFirstTagsState.tag}
                           </div>
                           <div id={`category-${addedSecondTagsState.color}`}>
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
   const [notificationPopupState, setNotificationPopupState] =
      useState<JSX.Element | boolean>(false);
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
      tag: assignedTags?.first,
      color: assignedTags?.first?.replace("#", "")
   });
   const [addedSecondTagsState, setAddedSecondTagsState] = useState<IaddedTagState>({
      tag: assignedTags?.second,
      color: assignedTags?.second?.replace("#", "")
   });

   const addTag = (el: any) => {
      console.log(el);
      addedFirstTagsState.color == undefined
         ? setAddedFirstTagsState({ tag: `${el.tag}`, color: el.tag.replace("#", "") })
         : setAddedSecondTagsState({ tag: `${el.tag}`, color: el.tag.replace("#", "") });
   };

   const removeFirstTag = () => {
      if (addedSecondTagsState !== undefined) {
         setAddedFirstTagsState({
            tag: addedSecondTagsState.tag,
            color: addedSecondTagsState.color
         });
         setAddedSecondTagsState({ tag: undefined, color: undefined });
      } else {
         setAddedFirstTagsState({ tag: undefined, color: undefined });
      }
   };
   const removeSecondTag = () => {
      setAddedSecondTagsState({ tag: undefined, color: undefined });
   };

   // // ================= FUNCTION: Post the commentary ===================== //
   // // this function will only be called if hte "contentToPost" is COMMENTARY
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
         try {
            const { data } = await client.mutate({
               mutation: CREATE_NEW_COMMENTARY,
               variables: {
                  VERSE_ID: verseBeingCommented.id,
                  body: textArea.current?.value,
                  is_private: isPrivatePost,
                  // make sure the secondary tag is not undefined!
                  category_tags: `${addedFirstTagsState.tag} ${
                     addedSecondTagsState.tag !== undefined ? addedSecondTagsState.tag : ""
                  }`,
                  // loop through the {object} of referenced verses and get only the ID
                  referenced_verses:
                     referencedVerses.length > 0
                        ? `${referencedVerses.map((verse: any) => verse.id).join(" ")}`
                        : null,
                  verse_citation: verseBeingCommented?.reference
               }
            });

            if (data.commentary.__typename === "Commentary") {
               router.reload();
            } else if (data.commentary.__typename === "ExceedsPostCount") {
               setLoadingState(false);
               setNotificationPopupState(
                  <NotificationPopup
                     closeModal={() => setNotificationPopupState(false)}
                     title={`This is sad! 😞`}
                     contentString={`${data.commentary.message}`}
                     newClass='notification-wrapper--Error'
                  />
               );
            } else {
               setLoadingState(false);
               setLoadingState(<p className='std-error-msg'>Sorry, something went wrong 🙁!</p>);
            }
         } catch (error: any) {
            console.log(error);
            setLoadingState(false);
            setNotificationPopupState(
               <NotificationPopup
                  closeModal={() => setNotificationPopupState(false)}
                  title={
                     error.graphQLErrors ? `You are not authorized 👮‍♂️` : `Something went wrong!`
                  }
                  contentString={
                     error.graphQLErrors
                        ? error.graphQLErrors[0]?.message
                        : "Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!"
                  }
                  newClass='notification-wrapper--Error'
               />
            );
         }
      } else if (textArea.current && textArea.current.value.length === 0) {
         setNotificationPopupState(
            <NotificationPopup
               title={"Empty field detected"}
               contentString={"Commentary text is required 🕵️‍♂️"}
               closeModal={closeModals}
               newClass={`notification-wrapper--Red`}
            />
         );
      } else if (!addedFirstTagsState.tag) {
         setNotificationPopupState(
            <NotificationPopup
               title={"No tag detected"}
               contentString={"At least one category tag is required 🕵️‍♂️"}
               closeModal={closeModals}
               newClass={`notification-wrapper--Red`}
            />
         );
      } else if (verseBeingCommented?.id === undefined || verseBeingCommented?.id === "") {
         setNotificationPopupState(
            <NotificationPopup
               title={"No verse selected"}
               contentString={"Please select a verse to comment on"}
               closeModal={closeModals}
               newClass={`notification-wrapper--Red`}
            />
         );
      }
   };

   // ================= FUNCTION: Post the thought ===================== //
   // this function will only be called if hte "contentToPost" is THOUGHT
   const handlePostThought = async () => {
      if (
         textArea.current &&
         textArea.current.value.length !== 0 &&
         addedFirstTagsState.tag !== undefined
      ) {
         setLoadingState(<SmallLoader />);
         try {
            const { data } = await client.mutate({
               mutation: CREATE_NEW_THOUGHT,
               variables: {
                  body: textArea.current?.value,
                  title: "...",
                  category_tags: `${addedFirstTagsState.tag} ${
                     addedSecondTagsState.tag !== undefined ? addedSecondTagsState.tag : ""
                  }`,
                  referenced_verses:
                     referencedVerses.length > 0
                        ? `${referencedVerses.map((verse: any) => verse.id).join(" ")}`
                        : null
               }
            });
            if (data.thought.__typename === "Thought") {
               router.reload();
            } else if (data.thought.__typename === "ExceedsPostCount") {
               setLoadingState(false);
               setNotificationPopupState(
                  <NotificationPopup
                     closeModal={() => setNotificationPopupState(false)}
                     title={`This is sad 😞`}
                     contentString={data.thought.message} //'Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!'
                     newClass='notification-wrapper--Error'
                  />
               );
            } else {
               setLoadingState(false);
               setLoadingState(<p className='std-error-msg'>Sorry, something went wrong 🙁!</p>);
            }
         } catch (error: any) {
            console.log(error);
            setLoadingState(false);
            setNotificationPopupState(
               <NotificationPopup
                  closeModal={() => setNotificationPopupState(false)}
                  title={`You're not authorized! 👮‍♂️`}
                  contentString={error.graphQLErrors[0].message} //'Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!'
                  newClass='notification-wrapper--Error'
               />
            );
         }
      } else if (textArea.current && textArea.current.value.length === 0) {
         setNotificationPopupState(
            <NotificationPopup
               title={"Empty field detected"}
               contentString={"Commentary text is required 🕵️‍♂️"}
               closeModal={closeModals}
               newClass={`notification-wrapper--Red`}
            />
         );
      } else if (!addedFirstTagsState.tag) {
         setNotificationPopupState(
            <NotificationPopup
               title={"No tag detected"}
               contentString={"At least one category tag is required 🕵️‍♂️"}
               closeModal={closeModals}
               newClass={`notification-wrapper--Red`}
            />
         );
      }
   };

   // ================= FUNCTION: Edit the commentary ===================== //
   // this function will only be called if hte "contentToPost" is COMMENTARY-EDIT
   const handleEditommentary = async () => {
      if (
         textArea.current &&
         textArea.current.value.length !== 0 &&
         addedFirstTagsState.tag !== undefined &&
         verseBeingCommented?.id
      ) {
         setLoadingState(<SmallLoader />);
         try {
            const { data } = await client.mutate({
               mutation: EDIT_COMMENTARY,
               variables: {
                  ID: postId,
                  body: textArea.current?.value,
                  is_private: isPrivatePost,
                  // make sure the secondary tag is not undefined!
                  category_tags: `${addedFirstTagsState.tag} ${
                     addedSecondTagsState.tag !== undefined ? addedSecondTagsState.tag : ""
                  }`,
                  referenced_verses:
                     referencedVerses.length > 0
                        ? `${referencedVerses.map((verse: any) => verse.id).join(" ")}`
                        : null
               }
            });
            if (data.edit_commentary) {
               router.replace(`/users/me`);
               // setNotificationPopupState(
               //    <NotificationPopup
               //       title={"Sucess! ✅"}
               //       contentString={"Your Post has been updated!"}
               //       closeModal={closeModals}
               //       newClass={`notification-wrapper--Success`}
               //    />
               // );
            } else {
               setLoadingState(<p className='std-error-msg'>Sorry, something went wrong 🙁!</p>);
            }
         } catch (error) {
            console.log(error);
            setLoadingState(false);
            setNotificationPopupState(
               <NotificationPopup
                  closeModal={() => setNotificationPopupState(false)}
                  title={`Something went wrong!`}
                  contentString='Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!'
                  newClass='notification-wrapper--Error'
               />
            );
         }
      } else if (textArea.current && textArea.current.value.length === 0) {
         setNotificationPopupState(
            <NotificationPopup
               title={"Empty field detected"}
               contentString={"Commentary text is required 🕵️‍♂️"}
               closeModal={closeModals}
               newClass={`notification-wrapper--Red`}
            />
         );
      } else if (!addedFirstTagsState.tag) {
         setNotificationPopupState(
            <NotificationPopup
               title={"No tag detected"}
               contentString={"At least one category tag is required 🕵️‍♂️"}
               closeModal={closeModals}
               newClass={`notification-wrapper--Red`}
            />
         );
      } else if (verseBeingCommented?.id === undefined || verseBeingCommented?.id === "") {
         setNotificationPopupState(
            <NotificationPopup
               title={"No verse selected"}
               contentString={"Please select a verse to comment on"}
               closeModal={closeModals}
               newClass={`notification-wrapper--Red`}
            />
         );
      }
   };

   // ================= FUNCTION: Edit the thought ===================== //
   // this function will only be called if hte "contentToPost" is THOUGHT-EDIT
   const handleEditThought = async () => {
      if (
         textArea.current &&
         textArea.current.value.length !== 0 &&
         addedFirstTagsState.tag !== undefined
      ) {
         setLoadingState(<SmallLoader />);
         try {
            const { data } = await client.mutate({
               mutation: EDIT_THOUGHT,
               variables: {
                  ID: postId,
                  body: textArea.current?.value,
                  // make sure the secondary tag is not undefined!
                  category_tags: `${addedFirstTagsState.tag} ${
                     addedSecondTagsState.tag !== undefined ? addedSecondTagsState.tag : ""
                  }`,
                  referenced_verses:
                     referencedVerses.length > 0
                        ? `${referencedVerses.map((verse: any) => verse.id).join(" ")}`
                        : null
               }
            });
            if (data.edit_thought) {
               router.replace(`/users/me`);
               // setLoadingState(false);
               // setNotificationPopupState(
               //    <NotificationPopup
               //       title={"Sucess! ✅"}
               //       contentString={"Your Post has been updated!"}
               //       closeModal={closeModals}
               //       newClass={`notification-wrapper--Success`}
               //    />
               // );
            } else {
               setLoadingState(<p className='std-error-msg'>Sorry, something went wrong 🙁!</p>);
            }
         } catch (error) {
            console.log(error);
            setLoadingState(false);
            setNotificationPopupState(
               <NotificationPopup
                  closeModal={() => setNotificationPopupState(false)}
                  title={`Something went wrong!`}
                  contentString='Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!'
                  newClass='notification-wrapper--Error'
               />
            );
         }
      } else if (textArea.current && textArea.current.value.length === 0) {
         setNotificationPopupState(
            <NotificationPopup
               title={"Empty field detected"}
               contentString={"Commentary text is required 🕵️‍♂️"}
               closeModal={closeModals}
               newClass={`notification-wrapper--Error`}
            />
         );
      } else if (!addedFirstTagsState.tag) {
         setNotificationPopupState(
            <NotificationPopup
               title={"No tag detected"}
               contentString={"At least one category tag is required 🕵️‍♂️"}
               closeModal={closeModals}
               newClass={`notification-wrapper--Error`}
            />
         );
      }
   };

   // --------------- handle the post privacy ------------
   const handlePostPrivacy = (choice: boolean) => {
      setIsPrivatePost(choice);
      if (choice) {
         setNotificationPopupState(
            <NotificationPopup
               title={"Private Post"}
               contentString={"This post will be private and only you'll be able to see it!"}
               closeModal={() => setNotificationPopupState(false)}
               newClass={`notification-wrapper--Info`}
            />
         );
      } else {
         setNotificationPopupState(
            <NotificationPopup
               title={"Public Post"}
               contentString={"This post will be public and everyone will be able to see it!"}
               closeModal={() => setNotificationPopupState(false)}
               newClass={`notification-wrapper--Info`}
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
            {!isPrivatePost && (
               <button className={`std-button-secondary`} onClick={() => handlePostPrivacy(true)}>
                  🔒
               </button>
            )}
            {isPrivatePost && (
               <div>
                  <button
                     className={`std-button-secondary selected`}
                     onClick={() => handlePostPrivacy(false)}>
                     🔒
                  </button>
               </div>
            )}
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
                  defaultValue={currentText}
                  onChange={() => {
                     growTextArea();
                  }}></textarea>

               {/*===  Tags Wrapper  ======*/}
               <div className={textEditorStyles.textEditorTags}>
                  {addedFirstTagsState.color && (
                     <div id={`category-${addedFirstTagsState.color}`}>
                        {addedFirstTagsState.tag}
                        <span
                           onClick={removeFirstTag}
                           className={textEditorStyles.textEditorTagsClose}>
                           X
                        </span>
                     </div>
                  )}
                  {addedSecondTagsState.color && (
                     <div id={`category-${addedSecondTagsState.color}`}>
                        {addedSecondTagsState.tag}
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
                     referencedVerses.map((el: any, index: number) => (
                        <div
                           className={textEditorStyles.textEditorVerse}
                           data-verse-id-={el.id}
                           key={index}>
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

         {/* -------------------------- Render Post buttons according to the type of post request being made ------------------------ */}
         {/*===  Post Button if Content type is commentar\y ======*/}
         {!loadingState && contentTypeToPost == "COMMENTARY" && (
            <div className='std-button'>
               <div className='std-button_gradient-text' onClick={handlePostCommentary}>
                  Post
               </div>
            </div>
         )}
         {/*===  Post Button if Content type is commentar\y and being called from the edit page ======*/}
         {!loadingState && contentTypeToPost == "COMMENTARY-EDIT" && (
            <div className='std-button'>
               <div className='std-button_gradient-text' onClick={handleEditommentary}>
                  Save
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
         {!loadingState && contentTypeToPost == "THOUGHT-EDIT" && (
            <div className='std-button'>
               <div className='std-button_gradient-text' onClick={handleEditThought}>
                  Save
               </div>
            </div>
         )}
         {loadingState}
      </div>
   );
};

export default TextEditor;

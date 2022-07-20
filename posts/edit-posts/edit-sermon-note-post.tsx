// core
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

// graphQL
import client from "../../apollo-client";
import { EDIT_SERMON_NOTE } from "../../graphql/posts/sermon_notes";

// components
import GeneralDropdown from "../../fragments/buttons/general-dropdown";
import NotificationPopup from "../../fragments/popups/notification";
import SmallLoader from "../../fragments/chunks/small-loader";

// styles
import sermonNotesPost from "../../styles/fragments/post-editors/SermonNotesPost.module.css";

// helpers
import { valuesCat } from "../../data/category_meta";
import { TsermonPost } from "../sermon-notes-post";
import { loggedInUser } from "../../helpers/auth/get-loggedin-user";

type sermonNotesProps = {
   sermonPost: TsermonPost;
};
const EditSermonNotesPost = ({ sermonPost }: sermonNotesProps) => {
   // check if the user is authenticated in order to render the content
   const [loggedInUserState, setLoggedInUserState] = useState<string>("");
   useEffect(() => {
      const authJWT = loggedInUser();
      if (authJWT) {
         setLoggedInUserState(authJWT.ID);
      }
   }, []);

   // ===============  opend the categories dropdoen  ==================  //
   const [dropDownCatState, setdropDownCatState] = useState<boolean>(false);
   const handleDropdownOpen = () => {
      setdropDownCatState(true);
   };

   const handleDropdownClose = () => {
      setdropDownCatState(false);
   };

   // ===============  change the color and text of button based on selection ==================  //
   const [currSelectionState, setCurrSelectionState] = useState<{
      text: string;
      bkg: string;
      textColor?: string;
      categories: string[];
   }>({
      text: sermonPost.category_tags,
      bkg: sermonPost.category_tags.replace("#", ""),
      textColor: "",
      categories: []
   });
   const handleTopicSelection = (option: any) => {
      setCurrSelectionState({
         text: option.funcParams.tag,
         bkg: option.funcParams.tag.replace("#", ""),
         categories: option.funcParams.subjects,
         textColor: "white"
      });
      setdropDownCatState(false);
   };

   // ===============   make sure that no fields are empty ==================  //
   const [notificationsPopupState, setnotificationsPopupState] =
      useState<boolean | JSX.Element>(false);
   const sermonTitleRef = useRef<HTMLInputElement>(null);
   const validateInput = () => {
      if (
         (sermonTitleRef.current && sermonTitleRef.current.value === "") ||
         currSelectionState.bkg === ""
      ) {
         setnotificationsPopupState(
            <NotificationPopup
               title={"Oops! 🤔"}
               contentString={`Check you have a title, have selected a category, and your file is less than 4MB please!`}
               closeModal={() => setnotificationsPopupState(false)}
               newClass={`notification-wrapper--Red`}
            />
         );
         return false;
      } else return true;
   };

   // the first fetch function uploads the file, the second creates a share link, and only if both succeed a call to the DB is made
   const [smallLoaderState, setSmallLoaderState] = useState<boolean>(false);
   const handlePostSermonNotes = async () => {
      if (validateInput()) {
         try {
            const { data }: any = await client.mutate({
               mutation: EDIT_SERMON_NOTE,
               variables: {
                  category_tags: currSelectionState.text,
                  title: sermonTitleRef.current?.value,
                  ID: sermonPost.ID
               }
            });

            if (data.edit_sermon_notes) {
               setSmallLoaderState(false);
               setnotificationsPopupState(
                  <NotificationPopup
                     closeModal={() => setnotificationsPopupState(false)}
                     title={`Success! ✅`}
                     contentString='content has been updated successfully 😀'
                     newClass='notification-wrapper--Success'
                  />
               );
            }
         } catch (error: any) {
            setSmallLoaderState(false);
            setnotificationsPopupState(
               <NotificationPopup
                  closeModal={() => setnotificationsPopupState(false)}
                  title={`You're not authorized! 👮‍♂️`}
                  contentString={error.graphQLErrors[0].message} //'Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!'
                  newClass='notification-wrapper--Error'
               />
            );
         }
      }
   };

   return (
      <>
         {loggedInUserState == sermonPost.creator.ID && (
            <div className={sermonNotesPost.mainWrapper}>
               {notificationsPopupState}
               <Link href={`/users/me`}>
                  <a className='closeModal'>X</a>
               </Link>
               <div className='large-spacer'></div>
               <h2 className={sermonNotesPost.title}>Edit Sermon Notes Post</h2>
               <input
                  type='text'
                  maxLength={60}
                  className={`std-input ${sermonNotesPost.stdInput}`}
                  placeholder={"Your Sermon's Title"}
                  defaultValue={sermonPost.title}
                  required
                  ref={sermonTitleRef}
               />
               {!dropDownCatState && (
                  <button
                     className={`std-button ${sermonNotesPost.stdButton}`}
                     onClick={handleDropdownOpen}
                     id={`category-${currSelectionState.bkg}`}>
                     <p
                        className={`std-button_gradient-text`}
                        style={{ backgroundColor: currSelectionState.textColor }}>
                        {currSelectionState.text}
                     </p>
                  </button>
               )}
               {dropDownCatState && (
                  <button
                     className={`std-button ${sermonNotesPost.stdButton}`}
                     onClick={handleDropdownClose}
                     id={`category-${currSelectionState.bkg}`}>
                     <p style={{ color: currSelectionState.textColor }}>
                        {currSelectionState.text}
                     </p>
                  </button>
               )}
               {dropDownCatState && (
                  <GeneralDropdown
                     mainNewClass={sermonNotesPost.dropdownWrapper}
                     optionNewClass={sermonNotesPost.dropdownOption}
                     cta={handleTopicSelection}
                     dropdownOptionsObject={[
                        { textContent: valuesCat[0].tag, funcParams: valuesCat[0], id: 1 },
                        { textContent: valuesCat[1].tag, funcParams: valuesCat[1], id: 2 },
                        { textContent: valuesCat[2].tag, funcParams: valuesCat[2], id: 3 },
                        { textContent: valuesCat[3].tag, funcParams: valuesCat[3], id: 4 },
                        { textContent: valuesCat[4].tag, funcParams: valuesCat[4], id: 5 },
                        { textContent: valuesCat[5].tag, funcParams: valuesCat[5], id: 6 },
                        { textContent: valuesCat[6].tag, funcParams: valuesCat[6], id: 7 },
                        { textContent: valuesCat[7].tag, funcParams: valuesCat[7], id: 8 },
                        { textContent: valuesCat[8].tag, funcParams: valuesCat[8], id: 9 },
                        { textContent: valuesCat[9].tag, funcParams: valuesCat[9], id: 10 }
                     ]}
                  />
               )}
               {currSelectionState.categories.length > 0 && (
                  <section className={"std-text-block--info"}>
                     <p>Tag Topics:</p>
                     {currSelectionState.categories.map((category, index) => (
                        <span key={index}>{category}, </span>
                     ))}
                  </section>
               )}
               {!smallLoaderState && (
                  <button className={`std-button`} onClick={handlePostSermonNotes}>
                     <p className={`std-button_gradient-text`}>SAVE</p>
                  </button>
               )}
               {smallLoaderState && <SmallLoader />}
            </div>
         )}
      </>
   );
};

export default EditSermonNotesPost;

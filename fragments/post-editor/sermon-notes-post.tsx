// core
import React, { useState, useRef } from "react";

// component
import GeneralDropdown from "../buttons/general-dropdown";

// styles
import sermonNotesPost from "../../styles/fragments/post-editors/SermonNotesPost.module.css";

// helpers
import { valuesCat } from "../../helpers/dropdown-values";
import NotificationPopup from "../notification-popup";

const SermonNotesPost = () => {
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
      text: "Select a Category",
      bkg: "",
      textColor: "",
      categories: []
   });
   const handleTopicSelection = (option: any) => {
      setCurrSelectionState({
         text: option.funcParams.tag,
         bkg: option.funcParams.color,
         categories: option.funcParams.subjects
      });
      setdropDownCatState(false);
   };

   // ===============  display the file name once uploaded ==================  //
   const [currentFileUpState, setCurrentFileUpState] = useState("");
   const handleFileUpload = (e: any) => {
      if (e !== undefined) {
         setCurrentFileUpState("your file has been selected. Ready to be posted! 😊");
      }
   };

   // ===============  Post the file, but before make sure that no fields are empty ==================  //
   const [notificationsPopupState, setnotificationsPopupState] = useState<boolean | JSX.Element>(
      false
   );
   const sermonTitleRef = useRef<HTMLInputElement>(null);
   const handlePostEvent = () => {
      if (
         (sermonTitleRef.current && sermonTitleRef.current.value === "") ||
         currSelectionState.bkg === ""
      ) {
         setnotificationsPopupState(
            <NotificationPopup
               title={"Oops! 🤔"}
               contentString={`Check you have a title and have selected a category please!`}
               closeModal={() => setnotificationsPopupState(false)}
               newClass={`notification-wrapper--Red`}
            />
         );
      }
   };
   return (
      <div className={sermonNotesPost.mainWrapper}>
         {notificationsPopupState}
         <h2 className={sermonNotesPost.title}>Submit Your Sermon Notes</h2>
         <input
            type='text'
            maxLength-={60}
            className={`std-input ${sermonNotesPost.stdInput}`}
            placeholder={"Your Sermon's Title"}
            required
            ref={sermonTitleRef}
         />
         {!dropDownCatState && (
            <button
               className={`std-button ${sermonNotesPost.stdButton}`}
               onClick={handleDropdownOpen}
               style={{ backgroundColor: currSelectionState.bkg }}>
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
               style={{ background: currSelectionState.bkg }}>
               <p
                  className={`std-button_gradient-text`}
                  style={{ background: currSelectionState.textColor }}>
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
                  { textContent: valuesCat[0].tag, funcParams: valuesCat[0] },
                  { textContent: valuesCat[1].tag, funcParams: valuesCat[1] },
                  { textContent: valuesCat[2].tag, funcParams: valuesCat[2] },
                  { textContent: valuesCat[3].tag, funcParams: valuesCat[3] },
                  { textContent: valuesCat[4].tag, funcParams: valuesCat[4] },
                  { textContent: valuesCat[5].tag, funcParams: valuesCat[5] },
                  { textContent: valuesCat[6].tag, funcParams: valuesCat[6] },
                  { textContent: valuesCat[7].tag, funcParams: valuesCat[7] },
                  { textContent: valuesCat[8].tag, funcParams: valuesCat[8] },
                  { textContent: valuesCat[9].tag, funcParams: valuesCat[9] }
               ]}
            />
         )}
         <label htmlFor='sermon-notes' className={`std-button ${sermonNotesPost.stdInputLabel}`}>
            <p className={`std-button_gradient-text`}>select File </p>
            <input
               id={"sermon-notes"}
               type='file'
               accept={`.doc, .docx, .pdf`}
               className={`${sermonNotesPost.stdInputFile}`}
               onChange={handleFileUpload}
            />
         </label>
         {currentFileUpState && <p className={sermonNotesPost.fileName}>{currentFileUpState}</p>}
         {currSelectionState.categories.length > 0 && (
            <p className={"std-text-block--info"}>
               <p>Tag Topics:</p>
               {currSelectionState.categories.map((category) => (
                  <span>{category}, </span>
               ))}
            </p>
         )}
         <button className={`std-button`} onClick={handlePostEvent}>
            <p className={`std-button_gradient-text`}> POST</p>
         </button>
      </div>
   );
};

export default SermonNotesPost;

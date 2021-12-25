// core
import React, { useState, useRef } from "react";
import { useRouter } from "next/router";

// component
import GeneralDropdown from "../buttons/general-dropdown";

// styles
import sermonNotesPost from "../../styles/fragments/post-editors/SermonNotesPost.module.css";

// helpers
import { valuesCat } from "../../helpers/dropdown-values";
import NotificationPopup from "../notification-popup";
import SmallLoader from "../chunks/small-loader";

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

   // ===============   make sure that no fields are empty ==================  //
   const [notificationsPopupState, setnotificationsPopupState] = useState<boolean | JSX.Element>(
      false
   );
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

   const [currentFileUpState, setCurrentFileUpState] = useState<string | JSX.Element>("");
   const [loadedFileState, setLoadedFileState] = useState<any>({ file: null, file_path: null });
   const handleFileUpload = async (fileUploaded: any) => {
      if (fileUploaded.target.files) {
         console.log(fileUploaded.target.files[0]);
         if (fileUploaded.target.files[0].size > 4000000) {
            setCurrentFileUpState(
               <p className={sermonNotesPost.fileNameErr}>
                  You file is as large as a Mammoth 🦣, please try something smaller like, a Kangaroo
                  🦘
               </p>
            );
            setLoadedFileState({ file: null, file_path: null });
         } else {
            setCurrentFileUpState(
               <p className={sermonNotesPost.fileName}>
                  {fileUploaded.target.files[0].name} has been selected. Ready to be posted! 😊
               </p>
            );
            setLoadedFileState({
               file: fileUploaded.target.files[0],
               file_path: fileUploaded.target.files[0].name
            });
         }
      }
   };

   // hanlde the upload
   const [smallLoaderState, setSmallLoaderState] = useState<boolean>(false);
   const router = useRouter();
   const handlePost = async () => {
      if (validateInput() === true && loadedFileState.file) {
         setSmallLoaderState(true);
         const post = await fetch("https://content.dropboxapi.com/2/files/upload", {
            method: "POST",
            headers: {
               Authorization: `Bearer ${process.env.NEXT_PUBLIC_DROPBOX_ACCESS_TOKEN}`,
               "Dropbox-API-Arg": `{ "path": "/sermon_notes/${
                  currSelectionState.text
               }/${new Date().getTime()}-${
                  loadedFileState.file_path
               }", "mode": { ".tag": "add" } }`,
               "Content-Type": "application/octet-stream"
            },
            body: loadedFileState.file
         });
         if (post.status == 200) {
            router.reload();
         } else {
            setnotificationsPopupState(
               <NotificationPopup
                  title={"Something Went Wrong!"}
                  contentString={`There was a problem uploading your file. Please try again! ⛔️🖥`}
                  closeModal={() => setnotificationsPopupState(false)}
                  newClass={`notification-wrapper--Red`}
               />
            );
            setSmallLoaderState(false);
         }
      } else {
         setnotificationsPopupState(
            <NotificationPopup
               title={"Oops! 🤔"}
               contentString={`Check you have a title, have selected a category, and your file is less than 4MB please!`}
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
            maxLength={60}
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
         {currentFileUpState}
         {currSelectionState.categories.length > 0 && (
            <section className={"std-text-block--info"}>
               <p>Tag Topics:</p>
               {currSelectionState.categories.map((category, index) => (
                  <span key={index}>{category}, </span>
               ))}
            </section>
         )}
         {!smallLoaderState && (
            <button className={`std-button`} onClick={handlePost}>
               <p className={`std-button_gradient-text`}>POST</p>
            </button>
         )}
         {smallLoaderState && <SmallLoader />}
      </div>
   );
};

export default SermonNotesPost;
